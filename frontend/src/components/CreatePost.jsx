import React, { useRef, useState, useEffect } from "react";
import { CiImageOn } from "react-icons/ci";
import Avatar from "react-avatar";
import axios from "axios";
import { TWEET_API_ENDPOINT } from "../../utils/constants";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setIsActive, setRefresh } from "../redux/features/tweets/tweetSlice";
import ReactLoading from "react-loading";

const CreatePost = ({ loggedInUser }) => {
  const [description, setDescription] = useState("");
  const [tweetImages, setTweetImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [tweetImagesPreview, setTweetImagesPreview] = useState([]);
  const [showTweetImages, setShowTweetImages] = useState(false);
  const imageInputRef = useRef(null);
  const dispatch = useDispatch();
  const { isActive } = useSelector((state) => state.tweet);
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    // Cleanup object URLs when component unmounts
    return () => {
      tweetImagesPreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [tweetImagesPreview]);

  const handleInputChange = (e) => {
    const files = Array.from(e.target.files);
    setTweetImages(files);

    setLoading(true);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setTweetImagesPreview(newImages);
    setShowTweetImages(true);
    setLoading(false);
  };

  const postTweet = async () => {
    try {
      setPostLoading(true);
      const formData = new FormData();
      formData.append("description", description);
      tweetImages.forEach((file) => {
        formData.append("tweetImages", file);
      });
      if(!description.trim()){
        toast.error("Post can't be empty!");
        return setPostLoading(false);
      }
      // console.log(formData);
      const res = await axios.post(`${TWEET_API_ENDPOINT}/create`, formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setShowTweetImages(false);
      setPostLoading(false);

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setRefresh());
        setDescription("");
        setTweetImages([]);
        setTweetImagesPreview([]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const forYouHandler = () => {
    dispatch(setIsActive(true));
  };

  const followingHandler = () => {
    dispatch(setIsActive(false));
  };

  return (
    <div className="w-full border-b-[1px] border-[#482f1e]">
      <div className="flex items-center border-b-[1px] cursor-pointer border-[#482f1e] text-md">
        <div
          onClick={forYouHandler}
          className="w-1/2 flex justify-center hover:bg-[#1f120a]"
        >
          <span
            className={`${
              isActive ? "border-b-4 border-[#E9804D]" : ""
            } text-lg py-4`}
          >
            For you
          </span>
        </div>
        <div
          onClick={followingHandler}
          className="w-1/2 flex justify-center hover:bg-[#1f120a]"
        >
          <span
            className={`${
              !isActive ? "border-b-4 border-[#E9804D]" : ""
            } text-lg py-4`}
          >
            Following
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="w-full flex items-center gap-2">
          <Avatar
            src={
              `${loggedInUser?.profileImage}` ||
              "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.1883982623.1721382457&semt=sph"
            }
            size="40"
            round={true}
            className="cursor-pointer"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is happening?!"
            className="w-[100%] bg-transparent text-xl outline-none border-b-[1px] border-[#E9804D] py-3 placeholder:pl-1 placeholder:text-[#f0c29e]"
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <CiImageOn
            onClick={() => imageInputRef.current.click()}
            size={28}
            className="cursor-pointer"
          />
          <input
            type="file"
            ref={imageInputRef}
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleInputChange}
          />
          <button
            onClick={postTweet}
            className="rounded-full text-lg font-bold px-6 py-2 bg-[#E9804D] hover:bg-[#F9804D]"
          >
            Post
          </button>
        </div>
        {showTweetImages && (
          <>
            {loading ? (
              <div className="w-full flex justify-center mb-8">
                <ReactLoading
                  type="spinningBubbles"
                  color="#E9804D"
                  height={"20%"}
                  width={"20%"}
                />
              </div>
            ) : (
              <div className="mt-4 columns-2 md:columns-3 lg:columns-4 gap-4">
                {tweetImagesPreview.map((image, index) => (
                  <div key={index} className="mb-4 break-inside-avoid">
                    <img
                      className="w-full h-auto rounded-lg object-cover"
                      src={image}
                      alt={`Uploaded ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {postLoading && (
        <div className="w-screen h-screen absolute flex items-center opacity-90 top-0 left-0 bg-black text-white">
          <div className="w-full flex justify-center mb-8">
            <ReactLoading
              type="spinningBubbles"
              color="#E9804D"
              height={"5%"}
              width={"5%"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
