import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { db } from "@/service/firebaseConfig";
import UserTripCardItem from './components/UserTripCardItem.jsx';

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  /**
   * Fetches all user trips from Firestore.
   */
  const GetUserTrips = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
      navigate('/');
      return;
    }

    const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push({ ...doc.data(), id: doc.id });
    });
    setUserTrips(trips);
  };

  /**
   * Handles trip deletion from Firebase and local state.
   * @param {string} tripId 
   */
  const handleDelete = async (tripId) => {
    try {
      await deleteDoc(doc(db, 'AITrips', tripId));
      setUserTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
    } catch (error) {
      console.error('Error deleting trip: ', error);
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-5 sm:px-10 lg:px-20 py-10">
      {/* Header */}
      <h2 className="font-bold mt-10 text-2xl sm:text-xl lg:text-2xl mb-8">
        My Trips
      </h2>

      {/* Trips List */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
        {userTrips.length > 0 ? (
          userTrips.map((trip) => (
            <UserTripCardItem key={trip.id} trip={trip} onDelete={() => handleDelete(trip.id)} />
          ))
        ) : (
          [1, 2, 3, 4, 5, 6].map((_, index) => (
            <div key={index} className="h-[220px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyTrips;
