import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./styles.css";

function UpdateListing() {
  const { register, handleSubmit, errors } = useForm();
  const [listingData, setListingData] = useState({});

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `/api/listings/5ebce8903591d548ae6aaf45`,
        });

        setListingData(response.data.data.listings);
      } catch (error) {
        return alert(
          "Something went wrong while trying to fetch this particular Listing...🧐"
        );
      }
    };
    fetchListing();
  }, []);

  const onSubmit = async (data) => {
    if (data.address === "") data.address = listingData.address;
    if (data.availableDate === "")
      data.availableDate = listingData.availableDate;
    if (data.city === "") data.city = listingData.city;
    if (data.contactEmail === "") data.contactEmail = listingData.contactEmail;
    if (data.contactPhone === "") data.contactPhone = listingData.contactPhone;
    if (data.country === "") data.country = listingData.country;
    if (data.description === "") data.description = listingData.description;
    if (data.rent === "") data.rent = listingData.rent;
    if (data.state === "") data.state = listingData.state;
    if (data.title === "") data.title = listingData.title;
    if (data.zip === "") data.zip = listingData.zip;

    try {
      const response = await axios({
        method: "PATCH",
        url: "/api/listings/5ebce8903591d548ae6aaf45",
        data,
      });

      if (response.status === 200) {
        alert("It Worked!");
        //   props.history.push("/");
      }
    } catch (error) {
      if (error.response.status === 403) {
        return alert("Sorry, your are not authorized to make this update!");
      } else {
        return alert("Sorry, We couldn't update your listing! ❌");
      }
    }
  };

  let renderSelect;
  let renderBuldingType;
  let renderUtil;
  let petAllowed;

  if (Object.keys(listingData).length === 0) {
    renderSelect = "";
    renderBuldingType = "";
    renderUtil = "";
    petAllowed = "";
  } else {
    renderSelect = (
      <div>
        <label>Room:</label>
        <select name="type" defaultValue={listingData.type} ref={register}>
          <option value="shared">Shared</option>
          <option value="private">Private</option>
        </select>
      </div>
    );

    renderBuldingType = (
      <div>
        {" "}
        <label>Building Type:</label>
        <select
          name="buildingType"
          defaultValue={listingData.buildingType}
          ref={register}
        >
          <option value="home">Home</option>
          <option value="basement">Basement</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
          <option value="townhome">Townhome</option>
        </select>
      </div>
    );

    if (listingData.utilitiesIncl) {
      renderUtil = (
        <div>
          <input
            className="radio"
            name="utilitiesIncl"
            type="radio"
            defaultChecked
            value="true"
            ref={register}
          />
          <label className="radio">Yes</label>

          <input
            className="radio"
            name="utilitiesIncl"
            type="radio"
            value="false"
            ref={register}
          />
          <label className="radio">No</label>
        </div>
      );
    } else {
      renderUtil = (
        <div>
          <input
            className="radio"
            name="utilitiesIncl"
            type="radio"
            value="true"
            ref={register}
          />
          <label className="radio">Yes</label>

          <input
            className="radio"
            name="utilitiesIncl"
            type="radio"
            defaultChecked
            value="false"
            ref={register}
          />
          <label className="radio">No</label>
        </div>
      );
    }

    if (listingData.petAllowed) {
      petAllowed = (
        <div>
          <input
            className="radio"
            name="petAllowed"
            type="radio"
            value="false"
            ref={register}
          />
          <label className="radio">No</label>

          <input
            className="radio"
            name="petAllowed"
            type="radio"
            defaultChecked
            value="true"
            ref={register}
          />
          <label className="radio">Yes</label>
        </div>
      );
    } else {
      petAllowed = (
        <div>
          <input
            className="radio"
            name="petAllowed"
            type="radio"
            defaultChecked
            value="false"
            ref={register}
          />
          <label className="radio">No</label>

          <input
            className="radio"
            name="petAllowed"
            type="radio"
            value="true"
            ref={register}
          />
          <label className="radio">Yes</label>
        </div>
      );
    }
  }

  return (
    <div>
      <h2>Update Listing 5ebce8903591d548ae6aaf45:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title:</label>
        <input
          type="text"
          placeholder={listingData.title}
          name="title"
          ref={register}
        />

        {renderSelect}
        {renderBuldingType}

        <label>Rent:</label>
        <input
          type="number"
          placeholder={listingData.rent}
          name="rent"
          ref={register}
        />

        <label>Utilities Included?:</label>
        {renderUtil}

        <label>Address:</label>
        <input
          type="text"
          placeholder={listingData.address}
          name="address"
          ref={register}
        />

        <label>City:</label>
        <input
          type="text"
          placeholder={listingData.city}
          name="city"
          ref={register}
        />

        <label>State:</label>
        <input
          type="text"
          placeholder={listingData.state}
          name="state"
          ref={register}
        />

        <label>Zip:</label>
        <input
          type="number"
          placeholder={listingData.zip}
          name="zip"
          ref={register}
        />

        <label>Country:</label>
        <input
          type="text"
          placeholder={listingData.country}
          name="country"
          ref={register}
        />

        <label>Description about your space:</label>
        <textarea
          name="description"
          placeholder={listingData.description}
          ref={register}
        />

        <label>First Date Available:</label>
        <input
          type="datetime"
          placeholder={listingData.availableDate}
          name="availableDate"
          ref={register}
        />

        <label>Pets Allowed?</label>
        {petAllowed}

        <label>Contact E-mail:</label>
        <input
          type="email"
          placeholder={listingData.contactEmail}
          name="contactEmail"
          ref={register({ pattern: /^\S+@\S+$/i })}
        />
        {errors.contactEmail && (
          <span>Please provide a valid e-mail for contact.</span>
        )}

        <label>Contact Phone:</label>
        <input
          type="tel"
          placeholder={listingData.contactPhone}
          name="contactPhone"
          ref={register}
        />

        <input type="submit" />
      </form>
    </div>
  );
}

export default UpdateListing;
