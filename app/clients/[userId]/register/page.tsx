import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/services/client.services'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import * as Sentry from "@sentry/nextjs";


const Register = async ( { params }: SearchParamProps ) => {
  const userId = await params;
  const user = await getUser(userId.userId);

  Sentry.metrics.set("user_view_register", user.name);

  return (
     <div className="flex h-screen max-h-screen">
     <section className="remove-scrollbar container">
       <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h10 w-fit"
          />
        </Link>
         <RegisterForm user={user}/>
         <p className="copyright py-12">© 2024 SK_appointment</p>
       </div>
     </section>

     <Image
       src="/assets/images/register-img.png"
       height={1000}
       width={1000}
       alt="sk_appointment"
       className="side-img max-w-[40%]"
      //  className="side-img max-w-[390px]"
     ></Image>
   </div>
  )
}

export default Register