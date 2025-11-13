"use client";

import { useState } from "react";
import { ArrowLeft, Download, Share2, Upload, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageUploadZone } from "@/components/plushie/image-upload-zone";
import { BeforeAfterSlider } from "@/components/plushie/before-after-slider";
import { CreditBadge } from "@/components/credits/credit-badge";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";

type GenerationState = "upload" | "preview" | "generating" | "success" | "error";
type SubjectType = "person" | "pet" | "other";

interface GeneratePageClientProps {
  userCredits: number;
}

/**
 * Client component for the generate page with all interactive functionality.
 * Authentication is handled by the parent Server Component.
 */
export function GeneratePageClient({ userCredits }: GeneratePageClientProps) {
  const [state, setState] = useState<GenerationState>("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [subjectType, setSubjectType] = useState<SubjectType>("person");
  const [generatedImage, setGeneratedImage] = useState<string>("/examples/plushie-1.jpg");
  const [error, setError] = useState<string>("");

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
      setState("preview");
    };
    reader.readAsDataURL(file);
  };

  const handleChangeImage = () => {
    setState("upload");
    setUploadedImage(null);
    setUploadedFile(null);
  };

  const handleGenerate = () => {
    setState("generating");
    // Simulate API call
    setTimeout(() => {
      // 10% chance of error for demo
      if (Math.random() < 0.1) {
        setError("Failed to generate plushie. The image quality might be too low. Please try a different image.");
        setState("error");
      } else {
        setGeneratedImage("/examples/plushie-1.jpg");
        setState("success");
      }
    }, 3000);
  };

  const handleRetry = () => {
    setError("");
    setState("preview");
  };

  const handleGenerateAnother = () => {
    setState("upload");
    setUploadedImage(null);
    setUploadedFile(null);
    setGeneratedImage("");
    setError("");
  };

  const handleDownload = () => {
    // Mock download functionality
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "plushie.png";
    link.click();
  };

  const handleShare = () => {
    // Mock share functionality
    alert("Share functionality coming soon!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <CreditBadge creditCount={userCredits} />
          </div>

          <Breadcrumbs />

          <div className="mt-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Generate Your Plushie
            </h1>
            <p className="text-lg text-muted-foreground">
              Upload a photo and watch AI transform it into an adorable plushie
            </p>
          </div>
        </div>

        {/* Upload State */}
        {state === "upload" && (
          <div className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Upload Your Photo</h2>
              <p className="text-muted-foreground mb-6">
                Upload a clear photo with good lighting. Works best with portraits of people or pets!
              </p>
              <ImageUploadZone onImageSelect={handleFileUpload} />
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Pro Tips for Best Results
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use high-resolution images (at least 800x800px)</li>
                  <li>• Ensure good lighting and clear visibility of the subject</li>
                  <li>• Center the subject in the frame</li>
                  <li>• Avoid busy backgrounds when possible</li>
                  <li>• Supported formats: JPG, PNG, WebP (Max 10MB)</li>
                </ul>
              </div>
            </Card>
          </div>
        )}

        {/* Preview State */}
        {state === "preview" && uploadedImage && (
          <div className="space-y-6">
            {/* Preview Section */}
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Preview Your Photo</h2>
                <Button variant="outline" onClick={handleChangeImage}>
                  Change Image
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {uploadedFile && (
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>Filename: {uploadedFile.name}</p>
                      <p>Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Options Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">What are you plushifying?</h3>
                    <div className="space-y-2">
                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary">
                        <input
                          type="radio"
                          name="subjectType"
                          value="person"
                          checked={subjectType === "person"}
                          onChange={(e) => setSubjectType(e.target.value as SubjectType)}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="ml-3 font-medium">Person</span>
                      </label>
                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary">
                        <input
                          type="radio"
                          name="subjectType"
                          value="pet"
                          checked={subjectType === "pet"}
                          onChange={(e) => setSubjectType(e.target.value as SubjectType)}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="ml-3 font-medium">Pet</span>
                      </label>
                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary">
                        <input
                          type="radio"
                          name="subjectType"
                          value="other"
                          checked={subjectType === "other"}
                          onChange={(e) => setSubjectType(e.target.value as SubjectType)}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="ml-3 font-medium">Other</span>
                      </label>
                    </div>
                  </div>

                  {/* Generation Section */}
                  <div className="p-6 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Generation Cost</p>
                        <p className="text-2xl font-bold">1 Credit</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Your Balance</p>
                        <p className="text-2xl font-bold">{userCredits} Credits</p>
                      </div>
                    </div>
                    <Button
                      onClick={handleGenerate}
                      className="w-full"
                      size="lg"
                      disabled={userCredits < 1}
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Plushie
                    </Button>
                    {userCredits < 1 && (
                      <p className="text-sm text-destructive mt-2 text-center">
                        You don&apos;t have enough credits. <Link href="/pricing" className="underline">Buy more</Link>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Generating State */}
        {state === "generating" && (
          <Card className="p-12">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  <Sparkles className="w-12 h-12 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">Creating Your Plushie...</h2>
                <p className="text-lg text-muted-foreground">
                  Our AI is working its magic. This usually takes 10-30 seconds.
                </p>
              </div>
              <div className="max-w-md mx-auto">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary animate-pulse w-2/3" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Please don&apos;t close this page
              </p>
            </div>
          </Card>
        )}

        {/* Success State */}
        {state === "success" && uploadedImage && (
          <div className="space-y-6">
            <Card className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Your Plushie is Ready!</h2>
                <p className="text-lg text-muted-foreground">
                  Slide to compare your original photo with the plushie version
                </p>
              </div>

              <div className="max-w-2xl mx-auto mb-8">
                <BeforeAfterSlider
                  beforeImage={uploadedImage}
                  afterImage={generatedImage}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleDownload} size="lg" className="gap-2">
                  <Download className="w-5 h-5" />
                  Download Plushie
                </Button>
                <Button onClick={handleShare} size="lg" variant="outline" className="gap-2">
                  <Share2 className="w-5 h-5" />
                  Share
                </Button>
                <Button onClick={handleGenerateAnother} size="lg" variant="outline" className="gap-2">
                  <Upload className="w-5 h-5" />
                  Generate Another
                </Button>
              </div>

              <div className="mt-8 text-center">
                <Link href="/gallery" className="text-primary hover:underline">
                  View all your plushies in the gallery →
                </Link>
              </div>
            </Card>
          </div>
        )}

        {/* Error State */}
        {state === "error" && (
          <Card className="p-12">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="w-12 h-12 text-destructive" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">Oops! Something Went Wrong</h2>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                  {error}
                </p>
              </div>

              <div className="space-y-4 max-w-md mx-auto">
                <div className="p-4 bg-muted rounded-lg text-left">
                  <h3 className="font-semibold mb-2">Troubleshooting Tips:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Make sure the image is clear and well-lit</li>
                    <li>• Try using a higher resolution image</li>
                    <li>• Ensure the subject is clearly visible</li>
                    <li>• Check that the image file isn&apos;t corrupted</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleRetry} size="lg" className="flex-1">
                    Try Again
                  </Button>
                  <Button onClick={handleChangeImage} size="lg" variant="outline" className="flex-1">
                    Upload Different Image
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  Still having issues?{" "}
                  <Link href="/docs/troubleshooting" className="text-primary hover:underline">
                    View troubleshooting guide
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
