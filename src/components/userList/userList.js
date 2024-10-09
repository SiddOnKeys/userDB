import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "../../shadCn/components/button.jsx"; // Shadcn Button
import Flag from "react-world-flags";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../shadCn/components/table"; // Shadcn Table components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../shadCn/components/card.jsx"; // Shadcn Card components
import { Copy } from "lucide-react";
import { truncate } from "../../utils/string";
import Notiflix from "notiflix";
import { countries } from "../../utils/countries";
import { PulseLoader } from "react-spinners";
import { doGetUserList } from "../../firebase/auth";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    Notiflix.Notify.success("Copied to clipboard");
  };

  const refreshData = async () => {
    setLoading(true);
    const userList = await doGetUserList();
    setUsers(userList); // Update state with the fetched user list
    setLoading(false);
  };

  useEffect(() => {
    // Check localStorage for existing users
    const storedUsers = localStorage.getItem("userList");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers)); // Parse and set the users from localStorage
    }

    // Fetch new data from Firestore
    refreshData();
  }, []);
  return (
    <Card className="w-full mx-auto p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">User List</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex justify-end ml-auto items-center mb-4">
          <Button onClick={refreshData} disabled={loading}>
            {loading ? <PulseLoader size={10} color="white" /> : "Refresh"}
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Country</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name || "N/A"}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-between max-w-[250px]">
                      {truncate(user.email, 30)}
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2 p-2"
                        onClick={() => handleCopy(user.email)}
                      >
                        <Copy size={16} />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-between max-w-[120px]">
                      {truncate(user.phoneNumber.toString(), 12)}
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2 p-2"
                        onClick={() => handleCopy(user.phoneNumber)}
                      >
                        <Copy size={16} />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Flag
                      // height="16px"
                      width="32px"
                      code={
                        countries.filter(
                          (country) => country.name === user.country
                        )[0]?.code || "N/A"
                      }
                    />
                    {user.country}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserList;
