import FlodeskForm from "@/components/FlodeskForm";

export default function Home() {
	return (
		<div className="flex flex-col items-center w-full p-5 text-center bg-white text-black font-inter">
			<div className="max-w-[600px] w-full flex-1">
				<h1 className="mb-[10px]">
					<img src="/OPERACARMELLOGO.png" alt="Opera Carmel" className="mx-auto max-w-[320px] w-full h-auto" />
				</h1>
				<p className="font-light text-[1.15rem] tracking-[0.02em] mb-[25px] italic text-[#4a4a4a]">
					A new tradition begins.
				</p>

				<FlodeskForm />
			</div>
		</div>
	);
}
