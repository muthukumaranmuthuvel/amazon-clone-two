const querySnapshot = await getDocs(collection(db, "items"));
        querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });