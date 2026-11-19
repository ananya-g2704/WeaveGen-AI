"""
WeaveGen AI - Conditional Generative Adversarial Network (cGAN)
Generator Architecture

Transforms a random latent vector (z) conditioned on textile parameters (c)
into synthetic handloom RGB pattern images.
"""

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

def build_generator(latent_dim=100, condition_dim=20, img_shape=(64, 64, 3)):
    """
    Builds the cGAN Generator Model.
    
    Inputs:
      - noise_input: (batch_size, latent_dim) [Random Gaussian noise]
      - condition_input: (batch_size, condition_dim) [One-hot encoded textile attributes]
      
    Output:
      - Synthetic RGB textile image tensor: (batch_size, H, W, 3) in range [-1.0, 1.0]
    """
    # 1. Inputs
    noise_input = keras.Input(shape=(latent_dim,), name="latent_noise_input")
    condition_input = keras.Input(shape=(condition_dim,), name="condition_vector_input")

    # 2. Concatenate Latent Vector and Condition Vector
    merged_input = layers.Concatenate(name="merge_latent_and_condition")([noise_input, condition_input])

    # 3. Dense Projection to initial low-resolution feature map (8x8x256)
    initial_dim = 8
    n_nodes = initial_dim * initial_dim * 256
    x = layers.Dense(n_nodes, use_bias=False, name="dense_projection")(merged_input)
    x = layers.BatchNormalization(name="bn_init")(x)
    x = layers.LeakyReLU(negative_slope=0.2, name="lrelu_init")(x)
    x = layers.Reshape((initial_dim, initial_dim, 256), name="reshape_to_8x8")(x)

    # 4. Upsampling Stage 1: 8x8 -> 16x16
    x = layers.Conv2DTranspose(128, kernel_size=4, strides=2, padding="same", use_bias=False, name="deconv_16")(x)
    x = layers.BatchNormalization(name="bn_16")(x)
    x = layers.LeakyReLU(negative_slope=0.2, name="lrelu_16")(x)

    # 5. Upsampling Stage 2: 16x16 -> 32x32
    x = layers.Conv2DTranspose(64, kernel_size=4, strides=2, padding="same", use_bias=False, name="deconv_32")(x)
    x = layers.BatchNormalization(name="bn_32")(x)
    x = layers.LeakyReLU(negative_slope=0.2, name="lrelu_32")(x)

    # 6. Upsampling Stage 3: 32x32 -> 64x64
    x = layers.Conv2DTranspose(32, kernel_size=4, strides=2, padding="same", use_bias=False, name="deconv_64")(x)
    x = layers.BatchNormalization(name="bn_64")(x)
    x = layers.LeakyReLU(negative_slope=0.2, name="lrelu_64")(x)

    # Optional 128x128 stage if img_shape is 128x128
    if img_shape[0] == 128:
        x = layers.Conv2DTranspose(16, kernel_size=4, strides=2, padding="same", use_bias=False, name="deconv_128")(x)
        x = layers.BatchNormalization(name="bn_128")(x)
        x = layers.LeakyReLU(negative_slope=0.2, name="lrelu_128")(x)

    # 7. Final Output Layer: 3 RGB channels with tanh activation [-1.0, 1.0]
    output_image = layers.Conv2D(img_shape[2], kernel_size=3, strides=1, padding="same", activation="tanh", name="rgb_output")(x)

    model = keras.Model(inputs=[noise_input, condition_input], outputs=output_image, name="WeaveGen_cGAN_Generator")
    return model

if __name__ == "__main__":
    gen = build_generator(latent_dim=100, condition_dim=20, img_shape=(64, 64, 3))
    gen.summary()
    print("Generator successfully instantiated.")
