import SideBar from "../../components/dashboard/SideBar";
import React from "react";
import Header from "../../components/dashboard/Header";
import DashboardLayout from "../../components/dashboard/Layout";

function users() {
  return (
    <DashboardLayout>
      <div className="mt-4 ml-2">
        <h1 className="text-2xl  dark:text-gray-100">
          Customers
          <span>
            <i className="fas fa-sync-alt cursor-pointer"></i>
          </span>
        </h1>
        <div className="table-wrapper no-scrollbar mt-6">
          <table>
            <thead className="theader">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Phone</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="pending">
                <td colspan="7" className="text-center">
                  {/* <SkeletonTableColumn /> */}
                </td>
              </tr>

              {/* <tr 
            v-for="user in customers">
            <td>{{ user.id }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.first_name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <div className="flex flex-row gap-2">
                <Icon name="la:trash-alt" className="text-red-600 text-xl cursor-pointer" @click="deleteUser(user)" />
              </div>
            </td>
          </tr> */}

              <tr>
                <td colspan="7" className="text-center">
                  No Customers Found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 ml-2">
        <h1 className="text-xl dark:text-gray-100 flex justify-between items-center px-4">
          <div>
            Staff
            <span>
              <i className="fas fa-sync-alt cursor-pointer"></i>
            </span>
          </div>

          <button className="btn-primary">Add Staff</button>
        </h1>
        <div className="table-wrapper no-scrollbar mt-6">
          <table>
            <thead className="theader">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Phone</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="pending">
                <td colSpan="7" className="text-center">
                  {/* <SkeletonTableColumn /> */}
                </td>
              </tr>
              {/* <tr v-if="!pending && staff" v-for="user in staff">
            <td>{{ user.id }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.first_name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <div className="flex flex-row gap-2">
                <Icon name="la:trash-alt" className="text-red-600 text-xl cursor-pointer" @click="deleteUser(user)" />
              </div>
            </td>
          </tr> */}

              <tr v-if="!pending && (!staff || staff.length < 1)">
                <td colspan="6" className="text-center">
                  No Staff Found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default users;
