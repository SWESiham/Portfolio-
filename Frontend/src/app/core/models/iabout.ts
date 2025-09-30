export interface IAbout {
    about: {
      title: string;
      description: string;
      yearsOfExperience: number;
      jobTitle: string;
      imgURL: string;
    }[];
  
  experience: {
  _id:string,
      
      companyName: string;
      companyURL: string;
      companyImgURL: string;
      companyJobTitle: string;
      startDate: string;
      endDate: string;
    }[];
  }
  