export interface MenuItem {
  id: number;
  value: string;
  description: string;
  price: string;
}

export interface Section {
  sectionTitle: string;
  items: MenuItem[];
  image: string;
}

export interface MenuData {
  _id: string;
  title: string;
  logo: string;
  sections: { [key: string]: Section };
  owner: string;
}
