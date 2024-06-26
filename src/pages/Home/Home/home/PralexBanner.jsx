import feturedimg from '../../../../assets/home/featured.jpg'
import SectionTitle from '../../../../components/sectionHeading/SectionTitle'
export default function PralexBanner() {
  return (
    <div className='py-8 bg-fixed py-10' style={{ backgroundImage: `url(${feturedimg})` }}>
      <SectionTitle title={'FROM OUR MENU'} subtitle={'---Check it out---'}></SectionTitle>
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center my-8">
        <img className='w-96 h-80' src={feturedimg} alt="" />
        <div className="max-w-2xl text-white space-y-4">
          <h2 className="text-xl">March 20, 2023<br />
            WHERE CAN I GET SOME?
          </h2>
          <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
          <button className="text-white  px-8 py-3 rounded-xl border-0 border-b-2 border-b-orange-500 hover:bg-[#1F2937] hover:border-orange-300">READ MORE</button>
        </div>
      </div>
    </div>
  )
}
