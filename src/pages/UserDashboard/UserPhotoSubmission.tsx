import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import ApiService from "../../services/ApiService";
import { errorToastMsg, successMsg } from "../../helpers/utils";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Pagination from "../../components/Pagination";
import DashboardLayout from "./DashboardLayout";

type SharePhotoForm = {
  package: string;
  drivelink: string;
  description: string;
  _id?: string;
};

const defaultForm: SharePhotoForm = {
  package: "",
  drivelink: "",
  description: "",
};

const validationSchema = Yup.object().shape({
  package: Yup.string().required("Package is required"),
  drivelink: Yup.string()
    .required("Drive link is required")
    .url("Enter a valid URL"),
  description: Yup.string()
    .required("Description is required")
    .min(5, "Description must be at least 5 characters"),
});

const UserPhotoSubmission: React.FC = () => {
  const [sharePhotos, setSharePhotos] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [packages, setPackages] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentSharePhoto = sharePhotos.slice(firstIndex, lastIndex);

  useEffect(() => {
    ApiService.getPackages().then((elm) => {
      const list = elm.map((elm: any) => ({
        value: elm._id,
        name: elm.title,
      }));
      setPackages(list);
    });

    ApiService.getSharePhotos()
      .then((res) => {
        if (res && res.data) {
          setSharePhotos(res.data);
          setTotalPages(Math.ceil(res.data.length / itemsPerPage));
        }
      })
      .catch((err) => console.error("Error fetching share photos:", err));
  }, []);

  const openAddModal = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleSubmitForm = async (
    values: SharePhotoForm,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      const payload = {
        packageId: values.package,
        drivelink: values.drivelink,
        description: values.description,
        user: localStorage.getItem("userid"),
      };

      const resp = await ApiService.addSharePhoto(payload);

      if (resp.success) {
        successMsg(resp.message);
        setSharePhotos((prev) => [...prev, resp.data]);
        resetForm();
        handleModalClose();
      } else {
        errorToastMsg(resp.message);
      }
    } catch (err: any) {
      errorToastMsg(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Share Photos</h1>
          <p className="text-gray-600 mb-6">Share Your Photos</p>

          {/* Header with Add Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h2 className="text-lg sm:text-xl font-semibold">Share Your Photos</h2>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 sm:px-6 rounded transition"
            >
              <FaPlus /> Add Your Photos
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Package Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Google Drive Link</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentSharePhoto.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-gray-500">
                      No items found.
                    </td>
                  </tr>
                ) : (
                  currentSharePhoto.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{item.package?.title || item.package}</td>
                      <td className="px-4 py-3 break-all">{item.drivelink}</td>
                      <td className="px-4 py-3">{item.description}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
              <h3 className="text-lg font-bold mb-4">Add Share Photos</h3>
              <Formik
                initialValues={defaultForm}
                validationSchema={validationSchema}
                onSubmit={handleSubmitForm}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <div>
                      <Field
                        as="select"
                        name="package"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a package</option>
                        {packages.map((item) => (
                          <option value={item.value} key={item.value}>
                            {item.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="package" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <Field
                        type="text"
                        name="drivelink"
                        placeholder="Google Drive Link"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <ErrorMessage name="drivelink" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <Field
                        as="textarea"
                        name="description"
                        placeholder="Description..."
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      />
                      <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={handleModalClose}
                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Add
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserPhotoSubmission;
