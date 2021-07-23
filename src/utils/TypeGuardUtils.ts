import Contact from "models/Contact";
import Coffee from "models/Coffee";

const isContact = (item: unknown): item is Contact => {
  const target = item as Contact;

  return (
    "name" in target &&
    typeof target.name === "string" &&
    !!target.name &&
    "email" in target &&
    typeof target.email === "string" &&
    !!target.email &&
    "body" in target &&
    typeof target.body === "string" &&
    !!target.body
  );
};

const isCoffee = (itemCoffee: unknown): itemCoffee is Coffee => {
  //itemCoffeeをCoffeeとして、targetに格納する
  const target = itemCoffee as Coffee;

  return (
    //targetの中にあるnameであり、かつ、target.nameのtypeが文字列である。
    "title" in target &&
    typeof target.title === "string" &&
    //ここの以下の記述がいつもわからない
    !!target.title &&
    "place" in target &&
    typeof target.place === "string" &&
    !!target.place &&
    "origin" in target &&
    typeof target.origin === "string" &&
    !!target.origin &&
    "evaluation" in target &&
    typeof target.evaluation === "string" &&
    !!target.evaluation &&
    "memo" in target &&
    typeof target.memo === "string" &&
    !!target.memo
  );
};

//targetの意味がわからない、



export { isContact, isCoffee };