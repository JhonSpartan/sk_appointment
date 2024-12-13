import ClientForm from "@/components/forms/ClientForm";
import PasskeyModal from "@/components/PasskeyModal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home( {searchParams}: SearchParamProps) {
  const admin = await searchParams
  const isAdmin = admin.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
    {isAdmin && <PasskeyModal/>}

      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h10 w-fit"
          />
          <ClientForm />
          <div className="text-14-regular mt-20 pb-5 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">© 2024 SK_appointment</p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
            </div>
        </div>
      </section>

      <Image
        src="/assets/images/nail-care-closeup-female-hands-filing-nails-with-professional-nail-file-beauty-nail-salon-top_157927.png"
        height={1000}
        width={1000}
        alt="client"
        className="side-img max-w-[50%]"
      ></Image>
    </div>
  );
}
