import { uniqueNamesGenerator, Config, names, countries } from 'unique-names-generator';
import { IContact } from '../model/contact.interface';

const IMAGES = [
  'https://randomuser.me/api/portraits/men/57.jpg',
  'https://randomuser.me/api/portraits/men/7.jpg',
  'https://randomuser.me/api/portraits/lego/2.jpg',
  'https://randomuser.me/api/portraits/lego/7.jpg',
  'https://randomuser.me/api/portraits/women/30.jpg',
];

const nameConfig: Config = {
  dictionaries: [names]
}
const countryConfig: Config = {
  dictionaries: [countries]
}

/**
 * This is a mock service later can be replaced with Backend API
 */
export const fetchContacts = (_ = 0, limit = 20) => {
  const contacts = Array(limit).fill(1).map((_, index) => {

    const contact = {
      name: uniqueNamesGenerator(nameConfig),
      country: uniqueNamesGenerator(countryConfig),
      picture: IMAGES[(index % IMAGES.length)]
    };
    return contact;
  })

  return new Promise<IContact[]>(resolve => {
    setTimeout(() => {
      resolve(contacts);
    }, 1500); // Enough time to show laoding icon
  });
};
