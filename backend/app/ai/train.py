"""
WeaveGen AI - cGAN Training Pipeline
Alternately trains Generator and Discriminator on curated Indian handloom patterns
with checkpoint saving and loss monitoring.
"""

import os
import time
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow import keras

from app.ai.generator import build_generator
from app.ai.discriminator import build_discriminator
from app.ai.dataset_loader import load_and_preprocess_dataset, CONDITION_DIM

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
CHECKPOINT_DIR = os.path.join(BASE_DIR, "trained_models")
SAMPLES_DIR = os.path.join(CHECKPOINT_DIR, "sample_outputs")

def save_sample_grid(generator, epoch, latent_dim, conditions, filepath):
    """Generates and saves a visual 2x2 grid of synthetic patterns during training."""
    n_samples = 4
    sample_conditions = tf.convert_to_tensor(conditions[:n_samples], dtype=tf.float32)
    noise = tf.random.normal((n_samples, latent_dim), dtype=tf.float32)

    generated_images = generator([noise, sample_conditions], training=False)
    # Convert from [-1, 1] to [0, 255] uint8
    generated_images = ((generated_images.numpy() + 1.0) * 127.5).clip(0, 255).astype(np.uint8)

    # Stitch into 2x2 image
    h, w, c = generated_images[0].shape
    grid_img = Image.new("RGB", (w * 2, h * 2))
    grid_img.paste(Image.fromarray(generated_images[0]), (0, 0))
    grid_img.paste(Image.fromarray(generated_images[1]), (w, 0))
    grid_img.paste(Image.fromarray(generated_images[2]), (0, h))
    grid_img.paste(Image.fromarray(generated_images[3]), (w, h))

    grid_img.save(filepath)

def train_handloom_cgan(
    epochs=10,
    batch_size=8,
    latent_dim=100,
    img_size=(64, 64),
    learning_rate=0.0002,
    beta_1=0.5
):
    """
    Executes the cGAN training loop with honest loss tracking and checkpoint saving.
    """
    os.makedirs(CHECKPOINT_DIR, exist_ok=True)
    os.makedirs(SAMPLES_DIR, exist_ok=True)

    print("=" * 65)
    print("WeaveGen AI - Conditional GAN (cGAN) Training Engine")
    print(f"Target Image Size: {img_size[0]}x{img_size[1]}")
    print(f"Latent Dimension: {latent_dim} | Condition Dimension: {CONDITION_DIM}")
    print(f"Epochs: {epochs} | Batch Size: {batch_size}")
    print("=" * 65)

    # 1. Load Preprocessed Dataset
    dataset_dir = os.path.join(BASE_DIR, "datasets")
    images_np, conditions_np = load_and_preprocess_dataset(dataset_dir=dataset_dir, target_size=img_size)
    num_samples = len(images_np)

    if num_samples == 0:
        raise ValueError("No images found for training! Please run dataset_builder.py first.")

    # 2. Build Models
    img_shape = (img_size[0], img_size[1], 3)
    generator = build_generator(latent_dim=latent_dim, condition_dim=CONDITION_DIM, img_shape=img_shape)
    discriminator = build_discriminator(img_shape=img_shape, condition_dim=CONDITION_DIM)

    # 3. Setup Optimizers and Loss
    d_optimizer = keras.optimizers.Adam(learning_rate=learning_rate, beta_1=beta_1)
    g_optimizer = keras.optimizers.Adam(learning_rate=learning_rate, beta_1=beta_1)
    bce_loss = keras.losses.BinaryCrossentropy()

    batches_per_epoch = max(1, num_samples // batch_size)
    print(f"\nStarting training on {num_samples} samples across {batches_per_epoch} batches/epoch...\n")

    start_time = time.time()
    history = {"d_loss": [], "g_loss": [], "d_acc": []}

    for epoch in range(1, epochs + 1):
        epoch_d_loss = 0.0
        epoch_g_loss = 0.0
        epoch_d_acc = 0.0

        # Shuffle dataset indices
        indices = np.random.permutation(num_samples)

        for b in range(batches_per_epoch):
            batch_idx = indices[b * batch_size : (b + 1) * batch_size]
            current_bs = len(batch_idx)

            # Convert numpy slices to explicit tf.Tensors
            real_imgs = tf.convert_to_tensor(images_np[batch_idx], dtype=tf.float32)
            batch_conds = tf.convert_to_tensor(conditions_np[batch_idx], dtype=tf.float32)

            # --- STEP A: TRAIN DISCRIMINATOR ---
            noise = tf.random.normal((current_bs, latent_dim), dtype=tf.float32)

            with tf.GradientTape() as d_tape:
                # Generate fake images from noise + condition
                fake_imgs = generator([noise, batch_conds], training=True)

                # Predict real and fake validity
                real_preds = discriminator([real_imgs, batch_conds], training=True)
                fake_preds = discriminator([fake_imgs, batch_conds], training=True)

                # One-sided label smoothing on real targets (0.9 instead of 1.0)
                real_targets = tf.fill(tf.shape(real_preds), 0.9)
                fake_targets = tf.fill(tf.shape(fake_preds), 0.0)

                d_loss_real = bce_loss(real_targets, real_preds)
                d_loss_fake = bce_loss(fake_targets, fake_preds)
                d_loss = 0.5 * (d_loss_real + d_loss_fake)

            # Apply Discriminator gradients
            d_grads = d_tape.gradient(d_loss, discriminator.trainable_variables)
            d_optimizer.apply_gradients(zip(d_grads, discriminator.trainable_variables))

            # Compute Discriminator accuracy
            real_acc = tf.reduce_mean(tf.cast(real_preds > 0.5, tf.float32))
            fake_acc = tf.reduce_mean(tf.cast(fake_preds < 0.5, tf.float32))
            d_acc = 0.5 * (real_acc + fake_acc)

            # --- STEP B: TRAIN GENERATOR ---
            noise = tf.random.normal((current_bs, latent_dim), dtype=tf.float32)

            with tf.GradientTape() as g_tape:
                gen_imgs = generator([noise, batch_conds], training=True)
                disc_preds = discriminator([gen_imgs, batch_conds], training=False)
                g_loss = bce_loss(tf.fill(tf.shape(disc_preds), 1.0), disc_preds)

            # Apply Generator gradients
            g_grads = g_tape.gradient(g_loss, generator.trainable_variables)
            g_optimizer.apply_gradients(zip(g_grads, generator.trainable_variables))

            epoch_d_loss += float(d_loss)
            epoch_g_loss += float(g_loss)
            epoch_d_acc += float(d_acc)

        epoch_d_loss /= batches_per_epoch
        epoch_g_loss /= batches_per_epoch
        epoch_d_acc /= batches_per_epoch

        history["d_loss"].append(epoch_d_loss)
        history["g_loss"].append(epoch_g_loss)
        history["d_acc"].append(epoch_d_acc)

        # Print progress
        print(f"Epoch [{epoch:02d}/{epochs:02d}]  |  D Loss: {epoch_d_loss:.4f}  |  D Acc: {epoch_d_acc * 100:.1f}%  |  G Loss: {epoch_g_loss:.4f}")

        # Save Sample Visual Grid at milestone epochs
        if epoch % 5 == 0 or epoch == epochs:
            sample_file = os.path.join(SAMPLES_DIR, f"epoch_{epoch:03d}.png")
            save_sample_grid(generator, epoch, latent_dim, conditions_np, sample_file)
            print(f"   --> Sample synthesized grid saved to: {sample_file}")

    total_time = time.time() - start_time
    print(f"\nTraining completed in {total_time:.2f} seconds.")

    # 4. Save Final Model Checkpoints
    gen_save_path = os.path.join(CHECKPOINT_DIR, "generator_checkpoint.keras")
    disc_save_path = os.path.join(CHECKPOINT_DIR, "discriminator_checkpoint.keras")

    generator.save(gen_save_path)
    discriminator.save(disc_save_path)

    print(f"[SUCCESS] Saved Generator Checkpoint to: {gen_save_path}")
    print(f"[SUCCESS] Saved Discriminator Checkpoint to: {disc_save_path}")

    return {
        "generator_path": gen_save_path,
        "discriminator_path": disc_save_path,
        "total_time": total_time,
        "history": history
    }

if __name__ == "__main__":
    train_handloom_cgan(epochs=10, batch_size=8, img_size=(64, 64))
