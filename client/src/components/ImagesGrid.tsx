import { Delete } from "@mui/icons-material";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  styled,
} from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "200",
  maxHeight: "200",
  width: 164,
  height: 164,
  fit: "crop",
  auto: "format",
});

interface ImagesGridProps {
  imagesList: File[] | any[];
  isLoaded: boolean;
  handleRemoveImage: (id: number) => void;
}

const ImagesGrid = ({
  imagesList,
  isLoaded,
  handleRemoveImage,
}: ImagesGridProps) => {
  return (
    <ImageList sx={{ width: "100%", height: 450 }} cols={3} rowHeight={164}>
      {imagesList.map((item, index: number) => {
        return (
          <ImageListItem key={index}>
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: "white" }}
                  onClick={() => handleRemoveImage(index)}
                >
                  <Delete />
                </IconButton>
              }
            />
            {isLoaded ? (
              <Img
                className="preview"
                src={`data:image;base64, ${item.url}`}
                alt={`image-${index}`}
              />
            ) : (
              <Img
                className="preview"
                src={URL.createObjectURL(item)}
                alt={`image-` + index}
                loading="lazy"
              />
            )}
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};

export default ImagesGrid;
