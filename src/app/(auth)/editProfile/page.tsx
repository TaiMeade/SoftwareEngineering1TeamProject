import { type Metadata, type NextPage } from "next";
import { prisma } from "~/server/db";
import { getAuth } from "~/server/session";
// import Link from "next/link";
// import Image from "next/image";

const session = await getAuth();

var usr = null;

if(session?.user.email != null)
{
  usr = await prisma.user.findFirst
  ({
    where: {

     email: {
       contains: session?.user.email,
     },
    },
    take: 1,
  })
}

let userName = usr?.name;



const editProfile: NextPage = () => {

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-4xl font-bold">{userName}</h1>
      <form className="">
        {/* This section is for inserting the title */}
        <h1 className="flex-fit mb-2 text-2xl font-bold">Title</h1>
        <input
          type="text"
          className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Title"
        />

        {/* This section is for describing the food to be made */}
        <h1 className="flex-fit text-1xl mb-2 mt-4 font-bold">Description</h1>
        <textarea
          className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          id="description"
          placeholder="Description"
        />

        {/* This section is for insering ingredients...find a way to make it a bulleted list? */}
        <h1 className="flex-fit text-1xl mb-2 mt-4 font-bold">Ingredients</h1>
        <div>
          <textarea
            className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id="ingredients"
            placeholder="Ingredients"
          >
            {/* <ol>
              <li>1st</li>
              <li>2nd</li>
              <li>3rd</li>
            </ol> */}
          </textarea>
        </div>

        <h1 className="flex-fit text-1xl mb-2 mt-4 font-bold">Steps</h1>
        <textarea
          className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Steps"
        />

        {/* This section is for selecting tags...ugly at the moment */}
        <h1 className="flex-fit text-1xl mb-1 mt-4 font-bold">Tags</h1>
        <div className="mb-2 text-xs">
          Please hold down CTRL to select more than one.
        </div>
        <select
          name="tags"
          id="tags"
          multiple
          className="ring-outset h-64 w-52 ring-1 ring-black"
        >
          <option value="appetizer">Appetizer</option>
          <option value="Snacks">Snacks</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="desserts">Dessert</option>
          <option value="sauces">Sauces</option>
          <option value="mexican">Mexican</option>
          <option value="japanese">Japanese</option>
          <option value="chinese">Chinese</option>
          <option value="indian">Indian</option>
          <option value="korean">Korean</option>
          <option value="fusion">Fusion Cuisine</option>
        </select>

        {/* This section is for selecting the rough cost estimate */}
        <h1 className="flex-fit text-1xl mb-1 mt-4 font-bold">Cost</h1>
        <select
          name="cost"
          id="cost"
          className="ring-outset rounded ring-1 ring-black"
        >
          <option value="low">$</option>
          <option value="medium">$$</option>
          <option value="high">$$$</option>
        </select>
      </form>
    </div>
  );
};

export default editProfile;

export const metadata: Metadata = {
  title: "Recipe App",
  description: "Recipe App Description",
};
