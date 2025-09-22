import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface WordPressImage {
  id: number;
  title: { rendered: string };
  alt_text: string;
  media_details: {
    sizes: {
      thumbnail?: { source_url: string };
      medium?: { source_url: string };
      large?: { source_url: string };
      full: { source_url: string };
    };
  };
  source_url: string;
  caption?: { rendered: string };
}

const Gallery = () => {
  const [wpSiteUrl, setWpSiteUrl] = useState("https://your-wordpress-site.com");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState<WordPressImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchWordPressImages = async (): Promise<WordPressImage[]> => {
    const response = await fetch(`${wpSiteUrl}/wp-json/wp/v2/media?per_page=50&media_type=image`);
    if (!response.ok) {
      throw new Error('Failed to fetch images from WordPress');
    }
    return response.json();
  };

  const { data: images = [], isLoading, error } = useQuery({
    queryKey: ['wordpress-images', wpSiteUrl],
    queryFn: fetchWordPressImages,
    enabled: wpSiteUrl.includes('http'),
  });

  const filteredImages = images.filter(image =>
    image.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.alt_text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openLightbox = (image: WordPressImage, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % filteredImages.length
      : (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const getImageUrl = (image: WordPressImage, size: 'thumbnail' | 'medium' | 'large' = 'medium') => {
    return image.media_details?.sizes?.[size]?.source_url || image.source_url;
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Gallery</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Explore our collection of images from WordPress
          </p>
          
          {/* WordPress URL Configuration */}
          <div className="max-w-md mx-auto mb-6">
            <label className="block text-sm font-medium mb-2 text-foreground">
              WordPress Site URL
            </label>
            <Input
              type="url"
              value={wpSiteUrl}
              onChange={(e) => setWpSiteUrl(e.target.value)}
              placeholder="https://your-wordpress-site.com"
              className="w-full"
            />
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-destructive text-lg mb-4">
              Failed to load images from WordPress
            </div>
            <p className="text-muted-foreground mb-4">
              Please check your WordPress site URL and ensure the REST API is enabled.
            </p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </div>
        )}

        {/* Gallery Grid */}
        {!isLoading && !error && filteredImages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <Card 
                key={image.id} 
                className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={getImageUrl(image, 'medium')}
                    alt={image.alt_text || image.title.rendered}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">
                    {image.title.rendered || 'Untitled'}
                  </h3>
                  {image.alt_text && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {image.alt_text}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && filteredImages.length === 0 && images.length > 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              No images found matching your search.
            </p>
            <Button onClick={() => setSearchTerm("")} variant="outline">
              Clear Search
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && images.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              No images found. Please check your WordPress configuration.
            </p>
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-center">
              {selectedImage?.title.rendered || 'Image'}
            </DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="flex-1 relative flex items-center justify-center p-4">
              <img
                src={getImageUrl(selectedImage, 'large')}
                alt={selectedImage.alt_text || selectedImage.title.rendered}
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Navigation Buttons */}
              {filteredImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => navigateImage('prev')}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => navigateImage('next')}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}

              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Image Counter */}
              {filteredImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} of {filteredImages.length}
                </div>
              )}
            </div>
          )}
          
          {/* Caption */}
          {selectedImage?.caption?.rendered && (
            <div className="p-4 border-t">
              <div 
                className="text-sm text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: selectedImage.caption.rendered }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;