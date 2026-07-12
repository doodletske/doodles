import PhotoCard from "./PhotoCard";
import { UploadedPhoto } from "./hooks/usePhotoUpload";

type Props = {
  photos: UploadedPhoto[];
  onRemove: (id: string) => void;
};

export default function UploadGrid({
  photos,
  onRemove,
}: Props) {
  if (!photos.length) return null;

  return (
    <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          preview={photo.preview}
          onRemove={() => onRemove(photo.id)}
        />
      ))}
    </div>
  );
}