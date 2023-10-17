const limit = process.env.REACT_APP_COUNT_DOCUMENT_DRAFT || 12
export const sidebar_menu = [
    {
        id:1,
        title:"Все",
        url:`/draft/all/1/${limit}/all`,
        img:"/img/items.svg"
    },
    {
        id:1,
        title:"Термичка",
        // url:`/draft/group/604f1cb24b2ca10006d44415/1/${limit}`,
        url:`/draft/group/1/${limit}/604f1cb24b2ca10006d44415`,
        img:"/img/term.svg"
    },
    {
        id:2,
        title:"Литьё",
        // url:`/group/604f1d2e4b2ca10006d4441d/1/${limit}`,
        url:`/draft/group/1/${limit}/604f1d2e4b2ca10006d4441d`,
        img:"/img/lit.svg"
    },
    {
        id:3,
        title:"Пресс",
        // url:`/group/604f1d494b2ca10006d4441f/1/${limit}`,
        url:`/draft/group/1/${limit}/604f1d494b2ca10006d4441f`,
        img:"/img/pres.svg"
    },
    {
        id:4,
        title:"Резка",
        // url:`/group/604f1cd14b2ca10006d44417/1/${limit}`,
        url:`/draft/group/1/${limit}/604f1cd14b2ca10006d44417`,
        img:"/img/rez.svg"
    },
    {
        id:5,
        title:"Гибка",
        // url:`/group/604f1cee4b2ca10006d44419/1/${limit}`,
        url:`/draft/group/1/${limit}/604f1cee4b2ca10006d44419`,
        img:"/img/gib.svg" 
    },
    {
        id:6,
        title:"Сварка",
        // url:`/group/604f1d0f4b2ca10006d4441b/1/${limit}`,
        url:`/draft/group/1/${limit}/604f1d0f4b2ca10006d4441b`,
        img:"/img/svarka.svg" 
    },
    {
        id:7,
        title:"Прочее",
        // url:`/group/604f1d614b2ca10006d44421/1/${limit}`,
        url:`/draft/group/1/${limit}/604f1d614b2ca10006d44421`,
        img:"/img/old.svg" 
    },
 
]