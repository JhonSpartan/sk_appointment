import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Manicurists } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { getAppointment } from "@/lib/services/appointment.services";
import * as Sentry from "@sentry/nextjs";
import { getUser } from "@/lib/services/client.services";


const RequestSuccess = async ({
  searchParams,
  params,
}: SearchParamProps) => {
  const searchParamsAppointId = await searchParams;
  const appointmentId = (searchParamsAppointId?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);
  const manicurist = Manicurists.find(
    (manicurist) => manicurist.name === appointment.primaryManicurist
  );
  const userId = await params;
  const user = await getUser(userId.userId);

  Sentry.metrics.set("user_view_appointment-success", user.name);

  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <Image
              src={manicurist?.image!}
              // src="/assets/icons/calendar.svg"
              alt="manicurist"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">{manicurist?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/clients/${userId.userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">© 2024 CarePluse</p>
      </div>
    </div>
  );
};

export default RequestSuccess;