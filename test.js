const tn = "+19197896";


const members = [
  {
    phoneNumber: "+19197891146",
    name: "Dan Tolbert",
  },
  {
    phoneNumber: "+19191231234",
    name: "Jon Doe",
  },
  {
    phoneNumber: "+18288884444",
    name: "Sally Stevenson",
  },
  {
    phoneNumber: "+14157891234",
    name: "Steven Sallyson",
  }
]


const member = members.filter(obj => {
  return obj.phoneNumber === tn;
})


// console.log(tn);
// console.log(members);

if (member) {
  console.log(member[0].name);
}
else {
  console.log("no one");
}