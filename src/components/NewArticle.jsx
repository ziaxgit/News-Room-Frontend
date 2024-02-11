import { useState, useContext } from "react";
import { FormThemeProvider } from "react-form-component";
import Form, {
  Input,
  Select,
  TextArea,
  SubmitButton,
} from "react-form-component";
import UserContext from "../UserContext";
import postNewArticle from "../../utils/postNewArticle";
import { useNavigate } from "react-router-dom";

export default function NewArticle() {
  const navigate = useNavigate();
  const { loggedUser } = useContext(UserContext);
  const [articlePosted, setArticlePosted] = useState(false);
  const [newArticleId, setNewArticleId] = useState(null);
  const [articleInfo, setArticleInfo] = useState({
    author: loggedUser,
    title: "",
    body: "",
    topic: "",
    article_img_url: "",
  });

  function handleChange(e) {
    setArticleInfo({
      ...articleInfo,
      title: e.title,
      body: e.body,
      topic: e.topic,
      article_img_url: e.article_img_url,
    });
  }

  function handleSubmit() {
    postNewArticle(articleInfo).then(({ article }) => {
      setArticlePosted(true);
      setNewArticleId(article.article_id);
    });
  }

  if (articlePosted) {
    return (
      <div className="article-posted">
        <h2>Article posted!</h2>
        <div>
          <button
            onClick={() => {
              navigate(`/articles/${newArticleId}`);
            }}
          >
            View article
          </button>
        </div>
      </div>
    );
  }

  return (
    <FormThemeProvider
      theme={{
        sizes: {
          inputWidth: "100%",
          inputGutterBottom: 15,
          labelGutterBottom: 5,
        },
        typography: {
          labelFontSize: "1.2em",
          labelFontWeight: "bold",
        },
      }}
    >
      <h1 className="post-article-header">Post a new article</h1>
      <div className="form-section">
        <Form
          onChange={handleChange}
          fields={["title", "body", "topic", "article_img_url"]}
          mandatory={["title", "body", "topic", "article_img_url"]}
        >
          <Input
            typography
            disabled={true}
            className="labels"
            name="author"
            placeholder={loggedUser}
            label="Author"
          />
          <Input
            name="title"
            label="Title"
            className="labels"
            placeholder="Enter title"
          />
          <TextArea
            name="body"
            className="labels"
            label="What's on your mind?"
            placeholder="Enter details"
          />
          <Select
            name="topic"
            label="Topic"
            placeholder="Select one"
            className="labels"
            options={[
              { label: "Coding", value: "coding" },
              { label: "Cooking", value: "cooking" },
              { label: "Football", value: "football" },
            ]}
          />

          <Input
            type="url"
            name="article_img_url"
            label="Enter image url"
            placeholder="Image url"
            className="labels"
          />
          <SubmitButton onClick={handleSubmit}>Publish</SubmitButton>
        </Form>
      </div>
      <br />
    </FormThemeProvider>
  );
}
