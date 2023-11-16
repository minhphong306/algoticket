"use client";
import React, { useEffect } from "react";
import "react-tabs/style/react-tabs.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import moment from "moment";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useCreateEvent } from "@/hooks/useCreateEvent";
import SuccessModal from "@/components/layouts/SuccessModal";
import { PacmanLoader } from "react-spinners";
import { useWallet } from "@txnlab/use-wallet";
import { useRouter } from "next/navigation";
import { ButtonLoading } from "@/components/buttonLoading";

type Inputs = {
  title: string;
  image: any;
  location: string;
  date: string;
  description: string;
  tickets: {
    id: number;
    name: string;
    amount: number;
    price: number;
    image: any;
  }[];
};

const CreateEvent = () => {
  const { createEvent, isOpenModal, btnAcceptModal, onCloseModal, isLoading } =
    useCreateEvent();
  const { isActive } = useWallet();
  const route = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const {
    fields: fieldsTicket,
    append: appendTicket,
    remove: removeTicket,
  } = useFieldArray({
    control,
    name: "tickets",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!isActive) {
      return route.push("/wallet-connect-algorand");
    }

    const userId = localStorage.getItem("userId");
    const tickets = data.tickets?.map((v, index) => ({
      name: v.name,
      amount: Number(v.amount),
      price: Number(v.price),
      image_url: `https://congcu.org/php-nft-ticket/images/${index + 1}.jpg`,
      // image_url: v.image,
      type: index + 1,
    }));

    const formatData = {
      event: {
        author_id: userId,
        is_feature: 0,
        name: data.title,
        date: moment(data.date).unix(),
        description: data.description,
        // feature_image: data.image,
        feature_image: "https://congcu.org/php-nft-ticket/images/event.png",
        location: data.location,
      },
      tickets: tickets,
    };

    console.log(formatData, "formatData");

    await createEvent(formatData);
  };

  const imageEvent = watch("image");

  const handleAddTicket = () => {
    const newItem = {
      id: Date.now(),
      name: "",
      amount: 0,
      price: 0,
      image: "",
    };

    appendTicket(newItem);
  };

  const handleRemoveTicket = (index: number) => {
    removeTicket(index);
  };

  const handleCloseModal = () => {
    reset();
    onCloseModal();
  };

  return (
    <div className="create-item">
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
      </section>
      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row justify-content-md-center">
            <div className="col-xl-6 col-lg-6 col-md-12 col-12">
              <div className="form-create-item">
                <div className="flat-tabs tab-create-item">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h4 className="title-create-item">Title</h4>
                    <input
                      type="text"
                      placeholder="Item Name"
                      {...register("title")}
                    />

                    <h4 className="title-create-item">Upload file</h4>
                    <label className="uploadFile">
                      <span className="filename">
                        {imageEvent && imageEvent[0]
                          ? imageEvent[0]?.name
                          : "PNG, JPG, GIF, WEBP or MP4. Max 200mb."}
                      </span>
                      <input
                        type="file"
                        className="inputfile form-control"
                        {...register("image")}
                      />
                    </label>

                    <h4 className="title-create-item">Location</h4>
                    <input
                      type="text"
                      {...register("location")}
                      placeholder="e.g. “Hanoi”"
                    />

                    <h4 className="title-create-item">Date</h4>
                    <input
                      type="date"
                      {...register("date")}
                      placeholder={`e.g. ${moment().format("L")}`}
                    />

                    <h4 className="title-create-item">Description</h4>
                    <textarea
                      {...register("description")}
                      placeholder="e.g. “This is very interesting event”"
                    ></textarea>
                    {fieldsTicket.length > 0 &&
                      fieldsTicket?.map((item, index) => (
                        <div
                          key={`item-create-${item.id}`}
                          className="create-event-item-container mb-5"
                        >
                          <div
                            className="d-flex justify-content-end fs-16"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleRemoveTicket(index)}
                          >
                            <span>X</span>
                          </div>
                          <h4 className="title-create-item">Ticket name</h4>
                          <input
                            type="text"
                            placeholder="Ticket name"
                            {...register(`tickets.${index}.name`)}
                          />

                          <h4 className="title-create-item">Ticket Amount</h4>
                          <input
                            type="number"
                            placeholder="Ticket Amount"
                            {...register(`tickets.${index}.amount`)}
                          />

                          <h4 className="title-create-item">Ticket Price</h4>
                          <input
                            type="number"
                            placeholder="Ticket Price"
                            {...register(`tickets.${index}.price`)}
                          />

                          <h4 className="title-create-item">Upload file</h4>
                          <label className="uploadFile">
                            <span className="filename">
                              PNG, JPG, GIF, WEBP or MP4. Max 200mb.
                            </span>
                            <input
                              type="file"
                              className="inputfile form-control"
                              {...register(`tickets.${index}.image`)}
                            />
                          </label>
                        </div>
                      ))}
                    {fieldsTicket.length < 3 && (
                      <button
                        onClick={handleAddTicket}
                        className="sc-button loadmore bag fl-button pri-3 mb-5 mt-3"
                        type="button"
                      >
                        <span>Add Ticket</span>
                      </button>
                    )}
                    {isLoading ? (
                      <ButtonLoading />
                    ) : (
                      <button
                        style={{ width: "100%" }}
                        className="sc-button loadmore style bag fl-button pri-3"
                        type="submit"
                      >
                        <span>Create Event</span>
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessModal
        onHide={handleCloseModal}
        show={isOpenModal}
        content={"Your bid has been listing to marketplace"}
        onClickBtn={btnAcceptModal}
        textButton={"Watch the listings"}
        title={"Create event successfully!"}
      />
      <Footer />
    </div>
  );
};

export default CreateEvent;
