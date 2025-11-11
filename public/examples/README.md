# Example Images

This directory contains before/after example images for plushie generations.

## Required Images

For the mock data to work properly, you'll need to add the following placeholder images:

### Original Images (Before)
- `original-1.jpg` through `original-12.jpg`
- These should be photos of people, pets, or other subjects
- Recommended size: 512x512px or larger
- Format: JPG or PNG

### Plushie Images (After)
- `plushie-1.jpg` through `plushie-12.jpg`
- These should be the AI-generated plushie versions
- Should correspond to the same numbered original images
- Recommended size: 512x512px
- Format: JPG or PNG

## Placeholder Images

For development, you can use placeholder images from services like:
- https://placehold.co/512x512
- https://picsum.photos/512/512
- Or create simple colored squares with image editing software

## Usage

These images are referenced in `src/lib/mock-data.ts` in the `mockGenerations` array.
