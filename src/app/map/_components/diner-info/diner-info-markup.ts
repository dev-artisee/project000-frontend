export interface DinerInfoDataType {
  placeName: string;
  placeUrl: string;
  latitude: string;
  longitude: string;
  addressName: string;
  roadAddressName: string;
  categoryName: string;
  phone: string;
}

export const dinerCardElement = (data: DinerInfoDataType) => {
  const dinerCard = document.createElement('div');
  dinerCard.id = 'diner-card';

  const dinerCardHeader = document.createElement('div');
  dinerCardHeader.id = 'diner-card-header';

  const dinerCardTitle = document.createElement('div');
  dinerCardTitle.id = 'diner-card-title';

  const titleHeading = document.createElement('h3');
  const titleLink = document.createElement('a');
  titleLink.href = data.placeUrl;
  titleLink.target = '_blank';
  titleLink.textContent = data.placeName;

  const categoryName = document.createElement('span');
  categoryName.textContent = data.categoryName;

  dinerCardTitle.appendChild(titleHeading);
  titleHeading.appendChild(titleLink);
  dinerCardTitle.appendChild(categoryName);

  const dinerCardOption = document.createElement('div');
  dinerCardOption.id = 'diner-card-option';

  const shareButton = document.createElement('button');
  shareButton.id = 'diner-share-btn';
  const shareImage = document.createElement('img');
  shareImage.src = 'share.svg';
  shareImage.width = 16;
  shareImage.height = 16;
  shareButton.appendChild(shareImage);

  const bookmarkButton = document.createElement('button');
  bookmarkButton.id = 'diner-bookmark-btn';
  const bookmarkImage = document.createElement('img');
  bookmarkImage.src = 'bookmark.svg';
  bookmarkImage.width = 16;
  bookmarkImage.height = 16;
  bookmarkButton.appendChild(bookmarkImage);

  dinerCardOption.appendChild(shareButton);
  dinerCardOption.appendChild(bookmarkButton);

  const dinerCardContent = document.createElement('div');
  dinerCardContent.id = 'diner-card-content';

  const roadAddress = document.createElement('p');
  roadAddress.textContent = data.roadAddressName;

  const phone = document.createElement('p');
  phone.textContent = data.phone;

  dinerCardContent.appendChild(roadAddress);
  dinerCardContent.appendChild(phone);

  dinerCard.appendChild(dinerCardHeader);
  dinerCardHeader.appendChild(dinerCardTitle);
  dinerCardHeader.appendChild(dinerCardOption);
  dinerCard.appendChild(dinerCardContent);

  return dinerCard;
};
