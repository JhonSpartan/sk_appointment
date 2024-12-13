import AppointmentForm from "@/components/forms/AppointmentForm";
import { getClient } from "@/lib/services/client.services";
import Image from "next/image";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";


const NewAppointment = async ({ params } : SearchParamProps) => {
  const userId = await params;
  const client = await getClient(userId.userId)

  Sentry.metrics.set("user_view_new-appointment", client.name);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Link href="/">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="logo"
              className="mb-12 h10 w-fit"
            />
          </Link>
          <AppointmentForm 
            type="create"
            userId={userId.userId}
            clientId={client?.$id}
          />

          <p className="copyright mt-10 py-12">© 2024 SK_appointment</p>
        </div>
      </section>

      <Image
        src="/assets/images/file.png"
        height={1000}
        width={1000}
        alt="appointment"
        // className="side-img max-w-[390] bg-bottom"
        className="side-img max-w-[40%]"
        object-fit="contain"
      ></Image>
    </div>
  );
}

export default NewAppointment;