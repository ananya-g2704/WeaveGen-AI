"""
WeaveGen AI - Conditional Generative Adversarial Network (cGAN)
Discriminator Architecture

Distinguishes authentic handloom textile images from generator fakes,
conditioned on matching regional parameters.
"""

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

def build_discriminator(img_shape=(64, 64, 3), condition_dim=20):
    """
    Builds the cGAN Discriminator Model.
    
    Inputs:
      - image_input: (batch_size, H, W, 3) [Real or Fake textile image]
      - condition_input: (batch_size, condition_dim) [Condition vector]
      
    Output:
      - Validity Score: (batch_size, 1) in range [0.0, 1.0]
    """
    # 1. Inputs
    image_input = keras.Input(shape=img_shape, name="textile_image_input")
    condition_input = keras.Input(shape=(condition_dim,), name="condition_vector_input")

    # 2. Spatially expand the condition vector to match image dimensions
    # Condition vector -> Dense layer -> Reshape into (H, W, 1) feature channel
    cond_projected = layers.Dense(img_shape[0] * img_shape[1], name="cond_projection")(condition_input)
    cond_reshaped = layers.Reshape((img_shape[0], img_shape[1], 1), name="cond_spatial_map")(cond_projected)

    # 3. Concatenate Image channels (3) with Condition channel (1) -> 4 channels total
    merged = layers.Concatenate(axis=-1, name="merge_image_and_condition")([image_input, cond_reshaped])

    # 4. Downsampling Convolution Block 1: 64x64 -> 32x32
    x = layers.Conv2D(32, kernel_size=4, strides=2, padding="same", name="conv_32")(merged)
    x = layers.LeakyReLU(negative_slope=0.2, name="lrelu_1")(x)
    x = layers.Dropout(0.25, name="drop_1")(x)

    # 5. Downsampling Convolution Block 2: 32x32 -> 16x16
    x = layers.Conv2D(64, kernel_size=4, strides=2, padding="same", name="conv_16")(x)
    x = layers.BatchNormalization(name="bn_disc_16")(x)
    x = layers.LeakyReLU(negative_slope=0.2, name="lrelu_2")(x)
    x = layers.Dropout(0.25, name="drop_2")(x)

    # 6. Downsampling Convolution Block 3: 16x16 -> 8x8
    x = layers.Conv2D(128, kernel_size=4, strides=2, padding="same", name="conv_8")(x)
    x = layers.BatchNormalization(name="bn_disc_8")(x)
    x = layers.LeakyReLU(negative_slope=0.2, name="lrelu_3")(x)
    x = layers.Dropout(0.25, name="drop_3")(x)

    # Optional 128x128 extra downsample
    if img_shape[0] == 128:
        x = layers.Conv2D(256, kernel_size=4, strides=2, padding="same", name="conv_4")(x)
        x = layers.BatchNormalization(name="bn_disc_4")(x)
        x = layers.LeakyReLU(negative_slope=0.2, name="lrelu_4")(x)
        x = layers.Dropout(0.25, name="drop_4")(x)

    # 7. Flatten and Output Sigmoid Validity Probability [0.0 = Fake, 1.0 = Real]
    features = layers.Flatten(name="flatten_features")(x)
    validity = layers.Dense(1, activation="sigmoid", name="validity_output")(features)

    model = keras.Model(inputs=[image_input, condition_input], outputs=validity, name="WeaveGen_cGAN_Discriminator")
    return model

if __name__ == "__main__":
    disc = build_discriminator(img_shape=(64, 64, 3), condition_dim=20)
    disc.summary()
    print("Discriminator successfully instantiated.")
