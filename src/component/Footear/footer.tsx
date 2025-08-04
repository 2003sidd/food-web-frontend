
const Header = () => {
  return (
    <>
     <footer className="bg-[#dfdfdf] text-black ">
      <div className=" flex flex-col sm:flex-row xl:container xl:m-auto items-center justify-between px-6 py-8">

<div>
  <h1 className="text-5xl font-bold mt-4">Quickbite</h1>
  <h2 className="underline font-semibold mt-2">Bringing Delicious to Your Doorstep!</h2>
  <h4 className="mt-2">Registered with house of companies</h4>
</div>
<div> 
  <h3 className="font-bold text-lg mt-8">Legal Pages</h3>
  <h5 className="text-md underline my-1 font-normal cursor-pointer">Terms and conditions</h5>
  <h5 className="text-md underline my-1 font-normal cursor-pointer">Privacy</h5>
  <h5 className="text-md underline my-1 font-normal cursor-pointer">Cookies</h5>

</div>
<div>

  <h3  className="font-bold text-lg mt-8">Important Links</h3>
  <h5 className="text-md underline my-1 font-normal cursor-pointer">Get help</h5>
  <h5 className="text-md underline my-1 font-normal cursor-pointer">Sign up to delivery</h5>
  <h5 className="text-md underline my-1 font-normal cursor-pointer">Add your resturant</h5>

</div>
      </div>
    </footer>
    </>
  );
};

export default Header;
