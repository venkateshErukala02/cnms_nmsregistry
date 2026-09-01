import * as React from "react";
import { useAppStore } from "./store";
import { useEffect } from "react";
import { useService } from "../../hooks/useService";
import type { ServerService } from "../../services/nmsregistry.service";
import {Logo} from '../../components/icon'

// import { Logo } from "@/components/icons";


export default function DashboardPage() {
  const { setForceRegistryResponse, setRegistrationResponse,setErrors } = useAppStore();
  const forceRegistryResponse = useAppStore(
    state => state.forceRegistryResponse
  );
  const error = useAppStore(
    state => state.errors
  );
  // const open = useAppStore(state => state.open);
  const registrationResponse = useAppStore(
    state => state.registrationResponse
  );
  const serverService = useService<ServerService>('ServerService');

  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //    const formData = new FormData(e.currentTarget);

  //     const data = Object.fromEntries(
  //       Array.from(formData)
  //     ) as Record<string, string>;

  //   if (!data.username) {
  //     setErrors({ username: "Username is required" });
  //     return;
  //   }

  //   setErrors({});

  //   const payload = {
  //     name: data.username,
  //     location: data.location,
  //     license: data.licenseid,
  //   };

  //   try {
  //     const response = await serverService.CreateForceRegistry(payload);
  //     setForceRegistryResponse(response);
  //   } catch (err) {
  //     console.error("API error:", err);
  //   }
  // };


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const formData = new FormData(e.currentTarget);

    // const data = Object.fromEntries(
    //   Array.from(formData)
    // ) as Record<string, string>;

    const formData = new FormData(e.currentTarget);

    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
     const validationErrors: Record<string, string> = {};

  if (!data.username?.trim()) {
    validationErrors.username = "Username is required";
  }

  if (!data.location?.trim()) {
    validationErrors.location = "Location is required";
  }

  if (!data.licenseid?.trim()) {
    validationErrors.licenseid = "License ID is required";
  }

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

    const payload = {
      name: data.username,
      location: data.location,
      license: data.licenseid,
    };

    try {
      const response = await serverService.CreateForceRegistry(payload);
      setForceRegistryResponse(response);
    } catch (err) {
      console.error("API error:", err);
    }
  };
  useEffect(() => {
    // if (forceRegistryResponse?.success === true) {
      serverService.getServerStats().then(stats => {
        setRegistrationResponse(stats);
      });
    // }
  }, [forceRegistryResponse, serverService]);


  // const formattedMessage = registryCodeResponse ? 
  //  registryCodeResponse.split(",")
  //   .map((item) => item.trim()) : [];

  return (
    <>
      <div className="p-3">
        <Logo />
      </div>
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-20">
         {registrationResponse?.success === true && (
        <div className="w-full p-4 shadow-xl border border-[#ccd5df] p-6 rounded-2xl bg-[#ebf5ff]">
          <div className="flex flex-col gap-4 xl:flex-row h-full items-center justify-center py-[109px] px-[1px]">
            <div className="flex flex-col gap-4 xl:w-2/3 items-center justify-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                ORNMS
              </h1>
                <form
                  className="w-full max-w-xs flex flex-col gap-8"
                  onSubmit={onSubmit}
                >
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    className="h-12 border border-[#ccd5df] px-3 text-black rounded-md bg-white"
                  />

                  {error.username && (
                  <p className="text-red-500 text-sm">
                    {error.username}
                  </p>
                   )}

                  <input
                    type="text"
                    name="location"
                    placeholder="Enter your location"
                    className="h-12 border border-[#ccd5df] px-3 text-black rounded-md bg-white"
                  />
                  {error.location && (
                    <p className="text-red-500 text-sm">{error.location}</p>
                  )}


                  <input
                    type="text"
                    name="licenseid"
                    placeholder="Enter your license ID"
                    className="h-12 border border-[#ccd5df] px-3 text-black rounded-md bg-white"
                  />
                  {error.licenseid && (
                      <p className="text-red-500 text-sm">{error.licenseid}</p>
                    )}


                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="h-12 px-6 text-base bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Submit
                    </button>
                  </div>
                </form>
            </div>
          </div>
        </div>
         )}
        {registrationResponse?.success === false &&
          (<div className="w-full p-4 shadow-xl border border-[#ccd5df] p-6 rounded-2xl bg-[#ebf5ff]">
            <div className="flex flex-col gap-4 xl:flex-row h-full items-center justify-center py-[39px] px-[1px]">
              <div className="flex flex-col gap-4 xl:w-2/3 items-center justify-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  ORNMS Registry Details
                </h1>
                <form className="w-full max-w-md flex flex-col gap-4 items-center">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={registrationResponse?.name || ""}
                    readOnly
                    className="h-12 border border-[#ccd5df] px-3 text-black rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block mb-1 font-medium">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={registrationResponse?.location || ""}
                    readOnly
                    className="h-12 border border-[#ccd5df] px-3 text-black rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="license" className="block mb-1 font-medium">
                    License
                  </label>
                  <input
                    id="license"
                    type="text"
                    value={registrationResponse?.license || ""}
                    readOnly
                    className="h-12 border border-[#ccd5df] px-3 text-black rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="uuid" className="block mb-1 font-medium">
                    UUID
                  </label>
                  <input
                    id="uuid"
                    type="text"
                    value={registrationResponse?.uuid || ""}
                    readOnly
                    className="h-12 border border-[#ccd5df] px-3 text-black rounded-md"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <a
                    href="/cnmsdashboard"
                    className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Open CNMS Dashboard
                  </a>
                </div>
              </form>
              </div>
            </div>
          </div>)
        }
      </main >
      <footer className="w-full flex items-center justify-center py-3 mt-[135px]">
        <a
          className="flex items-center gap-1 text-current no-underline"
          // href="https://heroui.com?utm_source=vite-template"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="text-gray-500 text-sm pb-3">© 2021, Copyright KEYWEST NETWORKS. ALL RIGHTS RESERVED.</span>
        </a>
      </footer>
    </>
  );
}
