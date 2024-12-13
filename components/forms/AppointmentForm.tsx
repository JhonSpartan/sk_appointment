"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Manicurists } from "@/constants";
import Image from "next/image";
import { SelectItem } from "../ui/select";
import { createAppointment, updateAppointment } from "@/lib/services/appointment.services";
import { getAppointmentSchema } from "@/lib/vaildation";
import { Appointment } from "@/types/appwrite.types";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SKELETON = "skeleton",
  SELECT = "select"
}

const AppointmentForm = ({ userId, clientId, type = "create", appointment, setOpen }: { userId: string, clientId: string, type: "create" | "cancel" | "schedule", appointment?: Appointment, setOpen?: (open: boolean) => void }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryManicurist: appointment ? appointment?.primaryManicurist : "",
      schedule: appointment ? new Date(appointment?.schedule!) : new Date(Date.now()),
      note: appointment?.note || "",
      cancelReason: appointment?.cancelReason || "",
    },
  });


  const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create" && clientId) {
        const appointmentData = {
          userId,
          client: clientId,
          primaryManicurist: values.primaryManicurist,
          schedule: new Date(values.schedule),
          status: status as Status,
          note: values.note,
        };

        const newAppointment = await createAppointment(appointmentData);

        if (newAppointment) {
          form.reset();
          router.push(
            `/clients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryManicurist: values.primaryManicurist,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancelReason: values.cancelReason,
          },
          type,
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };


  let buttonLabel;
  switch (type) {
    case "cancel":
        buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
    break;
    default:
      buttonLabel = "Submit Appointment";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New appointment</h1>
          </section>
        )}
        {type !== "cancel" && (
          <>
            <CustomFormField 
              control={form.control} 
              fieldType={FormFieldType.SELECT}
              name="primaryManicurist"
              label="Manicurist"
              placeholder="Select a manicurist"
            >
              {Manicurists.map((manicurist) => (
                <SelectItem key={manicurist.name} value={manicurist.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={manicurist.image}
                      width={32}
                      height={32}
                      alt={manicurist.name}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{manicurist.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField> 
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />
            <CustomFormField 
              control={form.control} 
              fieldType={FormFieldType.TEXTAREA}
              name="note"
              label="Notes"
              placeholder="Enter notes"
            />
          </>
        )}

        {type === "cancel" && (
          <CustomFormField 
            control={form.control} 
            fieldType={FormFieldType.TEXTAREA}
            name="cancelReason"
            label="Reason for cancel"
            placeholder="Enter reason for cancel"
          />
        )}

        <SubmitButton isLoading={isLoading} className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}>{buttonLabel}</SubmitButton>
      </form>
    </Form>
  )
};

export default AppointmentForm;