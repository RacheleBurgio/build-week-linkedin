import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Card, Modal, Image, Spinner } from "react-bootstrap";
import { fetchPosts } from "../redux/actions"; // Ensure correct import
import PostPictureUpload from "./PostPictureUpload";

const NewPost = () => {
  // Removed onClosePopup prop
  const me = useSelector((state) => state.profile.me);
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_LINKEDIN_API_KEY;
  const dispatch = useDispatch();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!postText) return;

    const body = {
      text: postText,
      ...(postImage && { image: postImage }),
    };

    setLoading(true);

    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/posts/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        // Log the error but don't set an error message
        console.error("Error creating post. Response not okay.");
        return;
      }

      await response.json();

      // Dispatch the fetchPosts action directly here
      dispatch(fetchPosts(true));

      // Close the modal after successful post creation
      resetForm();
    } catch (error) {
      // Log the error if you want, but do not set an error message state
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPostText("");
    setPostImage(null);
    setShowModal(false); // Close the modal after resetting form
  };

  const handleImageUpload = (imageUrl) => {
    setPostImage(imageUrl);
  };

  return (
    <>
      <Card
        className="mb-4 mt-3"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
      >
        <Card.Body style={{ display: "flex", alignItems: "center" }}>
          <Image
            src={me.image}
            roundedCircle
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
            alt="User Profile"
          />
          <p style={{ margin: 0 }}>Crea un nuovo post</p>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>Nuovo post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PostPictureUpload onUpload={handleImageUpload} />
          <Form onSubmit={handleCreatePost}>
            <Form.Group controlId="newPost">
              <Form.Control
                as="textarea"
                rows={3}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Scrivi qualcosa..."
                required
                aria-label="Post content"
                maxLength={500}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="my-2"
              size="sm"
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Pubblica"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewPost;
