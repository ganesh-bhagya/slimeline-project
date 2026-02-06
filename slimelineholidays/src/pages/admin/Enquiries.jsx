import { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import axiosClient from "../../../axios-client";
import Loader from "../../components/ui/Loader";

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const url = statusFilter !== "all" 
        ? `/enquiries?status=${statusFilter}`
        : `/enquiries`;
      const response = await axiosClient.get(url);
      const data = response.data;
      if (data && Array.isArray(data)) {
        setEnquiries(data);
      } else if (data.enquiries) {
        setEnquiries(data.enquiries);
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosClient.put(`/enquiries/${id}`, { status: newStatus });
      fetchEnquiries();
    } catch (error) {
      console.error("Error updating enquiry status:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) {
      return;
    }

    try {
      await axiosClient.delete(`/enquiries/${id}`);
      fetchEnquiries();
    } catch (error) {
      console.error("Error deleting enquiry:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "read":
        return "bg-blue-100 text-blue-800";
      case "responded":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const openModal = (enquiry) => {
    const modal = document.getElementById(`enquiry-modal-${enquiry.id}`);
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      if (enquiry.status === "pending") {
        handleStatusChange(enquiry.id, "read");
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        name: "Date",
        selector: (row) => formatDate(row.created_at),
        sortable: true,
        width: "120px",
      },
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "150px",
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
        width: "180px",
        wrap: true,
      },
      {
        name: "Mobile",
        selector: (row) => row.mobile || "N/A",
        sortable: false,
        width: "100px",
      },
      {
        name: "Tour",
        selector: (row) => {
          const tour = row.tour;
          if (!tour || tour === "Select Tour Country") return "N/A";
          return tour;
        },
        sortable: false,
        width: "120px",
        wrap: true,
      },
      {
        name: "Destination",
        selector: (row) => {
          const destination = row.destination;
          if (!destination || destination === "Select Tour Country") return "N/A";
          return destination;
        },
        sortable: false,
        width: "120px",
        wrap: true,
      },
      {
        name: "Travel Dates",
        selector: (row) =>
          row.arrival_date && row.departure_date
            ? `${formatDate(row.arrival_date)} - ${formatDate(row.departure_date)}`
            : "N/A",
        sortable: false,
        width: "170px",
        wrap: true,
      },
      {
        name: "Status",
        cell: (row) => (
          <select
            value={row.status || "pending"}
            onChange={(e) => {
              e.stopPropagation();
              handleStatusChange(row.id, e.target.value);
            }}
            onClick={(e) => e.stopPropagation()}
            className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold border-none ${getStatusBadgeColor(row.status || "pending")} cursor-pointer`}
          >
            <option value="pending">Pending</option>
            <option value="read">Read</option>
            <option value="responded">Responded</option>
          </select>
        ),
        width: "130px",
        ignoreRowClick: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <div onClick={(e) => e.stopPropagation()} className="flex gap-2 whitespace-nowrap">
            <button
              onClick={() => openModal(row)}
              className="text-indigo-600 hover:text-indigo-900 font-medium text-sm"
            >
              View
            </button>
            <button
              onClick={() => handleDelete(row.id)}
              className="text-red-600 hover:text-red-900 font-medium text-sm"
            >
              Delete
            </button>
          </div>
        ),
        width: "120px",
        minWidth: "120px",
        ignoreRowClick: true,
      },
    ],
    []
  );

  const customStyles = {
    table: {
      style: {
        backgroundColor: "transparent",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#f9fafb",
        borderBottom: "1px solid #e5e7eb",
      },
    },
    headCells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
        fontWeight: 600,
        fontSize: "12px",
        textTransform: "uppercase",
        color: "#6b7280",
      },
    },
    cells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    rows: {
      style: {
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f9fafb",
        },
      },
    },
  };

        if (loading) {
          return <Loader size="md" />;
        }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-theme-green-dark-color">
          Enquiries
        </h1>
        <div className="flex gap-4 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green-color w-full sm:w-auto"
          >
            <option value="all">All Enquiries</option>
            <option value="pending">Pending</option>
            <option value="read">Read</option>
            <option value="responded">Responded</option>
          </select>
        </div>
      </div>

      {enquiries.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600">No enquiries found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow" style={{ width: 'calc(100vw - 20rem)', overflowX: 'auto' }}>
          <DataTable
            columns={columns}
            data={enquiries}
            customStyles={customStyles}
            onRowClicked={openModal}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30, 50]}
            noDataComponent="No enquiries found"
            highlightOnHover
            pointerOnHover
            fixedHeader
          />
        </div>
      )}

      {/* Detail Modals */}
      {enquiries.map((enquiry) => (
        <div
          key={enquiry.id}
          id={`enquiry-modal-${enquiry.id}`}
          className="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50"
          onClick={(e) => {
            if (e.target.id === `enquiry-modal-${enquiry.id}`) {
              e.currentTarget.classList.add("hidden");
              e.currentTarget.classList.remove("flex");
            }
          }}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-2xl text-theme-green-dark-color">
                Enquiry Details
              </h3>
              <button
                onClick={() => {
                  const modal = document.getElementById(`enquiry-modal-${enquiry.id}`);
                  if (modal) {
                    modal.classList.add("hidden");
                    modal.classList.remove("flex");
                  }
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-sm text-gray-900">{enquiry.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">
                    <a href={`mailto:${enquiry.email}`} className="text-blue-600 hover:underline">
                      {enquiry.email}
                    </a>
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {enquiry.mobile ? (
                      <a href={`tel:${enquiry.mobile}`} className="text-blue-600 hover:underline">
                        {enquiry.mobile}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Living Country</label>
                  <p className="mt-1 text-sm text-gray-900">{enquiry.living_country || "N/A"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nationality</label>
                  <p className="mt-1 text-sm text-gray-900">{enquiry.nationality || "N/A"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tour</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {enquiry.tour && enquiry.tour !== "Select Tour Country" ? enquiry.tour : "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Destination</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {enquiry.destination && enquiry.destination !== "Select Tour Country" ? enquiry.destination : "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Adults</label>
                  <p className="mt-1 text-sm text-gray-900">{enquiry.adults || "N/A"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Children</label>
                  <p className="mt-1 text-sm text-gray-900">{enquiry.children || "N/A"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Flight Status</label>
                  <p className="mt-1 text-sm text-gray-900">{enquiry.flight_status || "N/A"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Arrival Date</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(enquiry.arrival_date)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Departure Date</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(enquiry.departure_date)}</p>
                </div>
              </div>
              {enquiry.holiday_reason && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Holiday Reason</label>
                  <p className="mt-1 text-sm text-gray-900">{enquiry.holiday_reason}</p>
                </div>
              )}
              {enquiry.message && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{enquiry.message}</p>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  const modal = document.getElementById(`enquiry-modal-${enquiry.id}`);
                  if (modal) {
                    modal.classList.add("hidden");
                    modal.classList.remove("flex");
                  }
                }}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

