import FlodeskForm from "@/components/FlodeskForm";

export default function Home() {
	return (
		<div className="flex flex-col items-center min-h-screen p-5 text-center bg-white text-black font-inter">
			<div className="max-w-[600px] w-full flex-1">
				<h1 className="font-josefin font-normal text-[clamp(2.5rem,8vw,4rem)] tracking-[0.15em] uppercase mb-[10px]">
					Opera Carmel
				</h1>
				<p className="font-light text-[1.15rem] tracking-[0.02em] mb-[25px] italic text-[#4a4a4a]">
					A new tradition begins.
				</p>

				<FlodeskForm />
			</div>
		</div>
	);
}
