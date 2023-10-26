import { type Metadata, type NextPage } from "next";

const AboutPage: NextPage = () => {
  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-4xl font-bold">About iCook</h1>

      <h2 className="text-2xl font-bold">Our Goals:</h2>

      <p>
        The goal of this website it to provide everyone (of all skills levels)
        with a singular place in which they can organize, share, and find new
        recipes. We hope to provide these services at a minimal cost, while also
        providing a beautiful, easy-to-navigate application. Our development
        team is known as{" "}
        <em>
          {'"'}The Impastas{'"'}
        </em>
        , and we are based in Radford, Virginia.
      </p>

      <h2 className="text-2xl font-bold">Meet the Impastas:</h2>

      <p>Our team consists of 5 members:</p>
      <ul>
        <li> Kaleb Cantrell</li>
        <br></br>
        <li> Cullen Danilowicz</li>
        <br></br>
        <li>
          Tai Meade
          {/* - I enjoy playing video games in my freetime. I grew up
          playing baseball, and I love spending time with my family and friends.*/}
        </li>
        <br></br>
        <li> Fletcher Mutert</li>
        <br></br>
        <li> Xander Waugh</li>
        <br></br>
      </ul>

      <p className="text-center text-sm">
        (Unofficial) Copyright © 2023 Impastas
      </p>
    </div>
  );
};

export default AboutPage;

export const metadata: Metadata = {
  title: "iCook | About",
};
