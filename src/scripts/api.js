import axios from "axios";

const instance = axios.create({
  baseURL: "https://webdev-api.loftschool.com",
  headers: {
    "Content-Type": "application/json"
  }
});

const id = 112;

const getAllCards = async () => {
  const rawData = await instance.get(`/categories/${id}`);

  return rawData.data;
};

const getAllSkills = async () => {
  const rawData = await instance.get(`/skills/${id}`);

  return rawData.data;
};

export const getAllWorks = async () => {
  const rawData = await instance.get(`/works/${id}`);

  return rawData.data;
};

export const getAllRevs = async () => {
  const rawData = await instance.get(`/reviews/${id}`);

  return rawData.data;
};

export const getSkillsArr = async () => {
  const categoriesArr = await getAllCards();
  const skillsArr = await getAllSkills();
  const resArr = categoriesArr.map(item => {
    const filteredSkills = skillsArr.filter(value => {
      return item.id === value.category;
    });
    let skills = {};
    filteredSkills.forEach(item => {
      skills[item.title] = item.percent;
    });
    return { skillsGroup: item.category, skills };
  });

  return resArr;
};
