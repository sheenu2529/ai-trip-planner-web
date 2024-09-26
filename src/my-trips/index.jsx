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
   * Used to Get All User Trips
   * @returns
   */
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/');
      return;
    }

    const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      setUserTrips(preVal => [...preVal, { ...doc.data(), id: doc.id }]);
    });
  };

  /**
   * Handle delete trip from Firebase and state
   * @param {string} tripId 
   */
  const handleDelete = async (tripId) => {
    try {
      await deleteDoc(doc(db, 'AITrips', tripId));

      setUserTrips(userTrips.filter((trip) => trip.id !== tripId));
    } catch (error) {
      console.error('Error deleting trip: ', error);
    }
  };

  return (
    <div className='max-w-5xl h-[80vh] mx-auto sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-20'>
      <h2 className='font-bold text-3xl'>My Trips</h2>

      <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
        {userTrips?.length > 0 ? userTrips.map((trip, index) => (
          <UserTripCardItem key={index} trip={trip} onDelete={() => handleDelete(trip.id)} />
        ))
        : [1, 2, 3, 4, 5, 6].map((item, index) => (
          <div key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
