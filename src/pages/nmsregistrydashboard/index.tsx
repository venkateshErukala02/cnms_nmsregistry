import * as React from "react";
import { useAppStore } from "./store";
import { useEffect } from "react";
import { useService } from "../../hooks/useService";
import type { ServerService } from "../../services/nmsregistry.service";
import {Logo} from '../../components/icon'


export default function DashboardPage() {
  const { setForceRegistryResponse, setRegistrationResponse,setErrors,setSelectedFile,setShowUploadPopup,setHasDb,setNoDb,setMigrationStatus } = useAppStore();
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
  const hasDb = useAppStore(
    state => state.hasDb
  );
  const noDb = useAppStore(
    state => state.noDb
  );
  const showUploadPopup = useAppStore(
    state => state.showUploadPopup
  );
  const selectedFile = useAppStore(
    state => state.selectedFile
  );
  const migrationStatus = useAppStore(state => state.migrationStatus)

   const handleOpenUploadPopup = () => {
  setSelectedFile(null);
  setShowUploadPopup(true);
};

const handleCloseUploadPopup = () => {
  setSelectedFile(null);
  setShowUploadPopup(false);
};

const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0] || null;
  setSelectedFile(file);
};



  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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


  const checkMigrationStatus = async () => {
      try {
        const response = await serverService.getMigrateStatus();

            setMigrationStatus(response);
        console.log("Migration status:", response);

        if (response.status === "SUCCESS") {
          console.log('succes status');
                return;
        }

        if (response.status === "FAILED") {
          console.log('succes status');
                return;
        }


        if (response.status === "RUNNING") {
          setTimeout(() => {
            checkMigrationStatus();
          }, 5000);
        } else {
          console.log("Migration completed:", response);
        }
      } catch (err) {
        console.error("Migration status API error:", err);

      }
    };


  const handleRestoreFromExistingServer = async () => {
    try {
      const response = await serverService.CreateRegistryMigration();
      console.log("Migration response:", response);
       if (response.status === 'STARTED') {
          await checkMigrationStatus();

        }
    } catch (err) {
      // console.error("Migration API error:", err);
    }
  };

  const handleUploadDbFile = async () => {
    if (!selectedFile) {
      console.error("Please select a database file");
      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);
    try {
      const response = await serverService.UploadDatabasefile(formData);

        console.log("Upload response:", response);
        if (response.status === "STARTED") {
          await checkMigrationStatus();

          handleCloseUploadPopup();
        }

        // Close popup after successful upload
        // handleCloseUploadPopup();

      } catch (err) {
        console.error("Upload API error:", err);
      }
    };


  const canOpenDashboard =
  noDb || migrationStatus?.status === "SUCCESS";




  return (
    <>
      <div className="p-3">
        <Logo />
      </div>
      <main className="min-h-[86vh] flex items-center justify-center px-4 ">
         {registrationResponse?.success === false && (
        <div className="w-full max-w-2xl rounded-2xl border border-[#ccd5df] bg-[#ebf5ff] p-3 shadow-xl">
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
        {(registrationResponse?.success === true ||
          registrationResponse?.success === undefined)  &&
          (<div className="w-full max-w-2xl rounded-2xl border border-[#ccd5df] bg-[#ebf5ff] p-3 shadow-xl">
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
                  <div className="w-full flex items-center justify-center gap-8 pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasDb}
                    onChange={(e) => {
                      setHasDb(e.target.checked);

                      if (e.target.checked) {
                        setNoDb(false);
                      }
                    }}
                    className="w-5 h-5 accent-blue-600"
                  />
                  <span className="font-medium text-gray-800">
                    DB Migration
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={noDb}
                    onChange={(e) => {
                      setNoDb(e.target.checked);

                      if (e.target.checked) {
                        setHasDb(false);
                      }
                    }}
                    className="w-5 h-5 accent-blue-600"
                  />
                  <span className="font-medium text-gray-800">
                    No DB Migration
                  </span>
                </label>
              </div>

              {hasDb && (
                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    onClick={handleRestoreFromExistingServer}
                  >
                    Restore from Existing server
                  </button>

                  <button
                    type="button"
                    className="px-5 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
                    onClick={handleOpenUploadPopup}
                  >
                    Upload
                  </button>

                </div>
              )}

           {migrationStatus && (   <div className="flex items-center justify-center bg-white p-[12px] min-h-[63px] max-h-[100px] min-w-[320px] max-w-[413px] border border-[#ccd5df]">
                <span className="text-red-500">DB Migration Status:</span>
                 <span
                  className={`ml-2 font-medium ${
                    migrationStatus.status === 'RUNNING'
                      ? 'text-orange-500'
                      : migrationStatus.status === 'COMPLETED'
                        ? 'text-green-500'
                        : migrationStatus.status === 'FAILED'
                          ? 'text-red-500'
                          : 'text-gray-500'
                  }`}
                >
                  {migrationStatus.status}
                </span>
              </div>
            )}

                 <div className="flex justify-end pt-4">
                <a
                  href={canOpenDashboard ? "/cnmsdashboard" : undefined}
                  onClick={(e) => {
                    if (!canOpenDashboard) {
                      e.preventDefault();
                    }
                  }}
                  className={`px-5 py-2 text-white rounded-md transition ${
                    canOpenDashboard
                      ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  aria-disabled={!canOpenDashboard}
                >
                  Open CNMS Dashboard
                </a>
              </div>
              </form>
              </div>
            </div>
          </div>)
        }

            {showUploadPopup && (
      <article className="fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-[#00000080]">
        <article className="absolute top-[35%] left-[35%] z-[100] mt-2 rounded-lg border border-[#ccc] bg-white p-[25px]">

          {/* Header */}
          <div className="flex w-full items-center justify-between">
              <h4 className="text-2xl font-bold text-gray-800">
                Upload Database
              </h4>

              <span
                onClick={handleCloseUploadPopup}
                role="button"
                aria-label="Close"
                className="cursor-pointer text-2xl font-bold text-gray-600 hover:text-red-600"
              >
                ×
            </span>
          </div>

      <div className="row mt-3">
        <div
          className="col-12"
          style={{ marginBottom: "15px" }}
        >
           <div className="flex items-center gap-4">
          <label
            htmlFor="databaseFile"
            className="settinglabelsub"
          >
            Select Database File:
          </label>

           <label
              htmlFor="databaseFile"
              className="flex items-center gap-2 mt-2 cursor-pointer border border-[#ccd5df] rounded-md bg-white px-3 py-3"
            >
              <span className="text-gray-600 text-sm">📎</span>\
              <span className="text-gray-600">
                {selectedFile ? selectedFile.name : "Upload File"}
              </span>
            </label>
                </div>
          <input
            type="file"
            id="databaseFile"
            className="form-control"
            // accept=".db,.sqlite,.sqlite3"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <article className="f-r">
        <button
          type="button"
          className="px-5 py-2 rounded-lg bg-sky-400 text-black font-medium"
          onClick={handleCloseUploadPopup}
        >
          Cancel
        </button>

        <button
          type="button"
          className="px-5 py-2 rounded-lg bg-sky-400 text-black font-medium"
          style={{
            marginLeft: "10px",
            opacity: selectedFile ? 1 : 0.5,
            cursor: selectedFile ? "pointer" : "not-allowed",
          }}
          disabled={!selectedFile}
          onClick={handleUploadDbFile}
        >
          Upload
        </button>
          </article>

          </article>
        </article>
        )}
      </main >


      <footer className="z-[1000] w-full flex items-center justify-center py-3">
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
