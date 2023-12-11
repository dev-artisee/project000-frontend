export interface DinerInfoDataType {
  placeName: string;
  placeUrl: string;
  addressName: string;
  roadAddressName: string;
  categoryName: string;
  phone: string;
}

const dinerInfoMarkup = (data: DinerInfoDataType) => {
  const iwHtml = `<div id="diner-card">
      <div id="diner-card-header">
        <div id="diner-card-title">
          <h3>
            <a href="${data.placeUrl}" target="_blank">
              ${data.placeName}
            </a>
          </h3>
          <span>${data.categoryName}</span>
        </div>
        <div id="diner-card-option">
          <button id="diner-share-btn">
            <img src="share.svg" width="16" height="16"/>
          </button>
          <button id="diner-bookmark-btn">
            <img src="bookmark.svg" width="16" height="16"/>
          </button>
        </div>
      </div>
      <div id="diner-card-content">
        <p>${data.roadAddressName}</p>
        <p>${data.phone}</p>
      </div>
    </div>
    `;
  return iwHtml;
};

export default dinerInfoMarkup;
