import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { collection, getDoc, doc } from "firebase/firestore";
import FiveStarsDisplay from "./FiveStarsDisplay";
import {MdVerifiedUser} from 'react-icons/md'

export default function Reviews() {
    const [retrievedReviews, setRetrievedReviews] = useState(null);
    const [listOfPages, setListOfPages] = useState(null)
    const [indexOfCurrentPage, setIndexOfCurrentPage] = useState(0);


    async function getAllReviews(){
        const docRef = doc(db, 'aluminumWallets/reviews');
        let result = await getDoc(docRef);
        result = result.data();
        setRetrievedReviews(result.reviews)
    }

    //fetch product reviews from db on mount
    useEffect(() => {
        getAllReviews()
    }, [])

    useEffect(() => {
        if (retrievedReviews) {
            const pages = paginateReviews(8, retrievedReviews);
            setListOfPages(pages)
        }
    }, [retrievedReviews])
    
    if(listOfPages){
      return (
        <div style={{gridColumnStart: 1, gridColumnEnd: -1, minHeight: '100vh', padding: '5rem'}}>
            <div style={{display: 'flex', gap: '.6rem', borderBottom: '.23rem solid rgb(190, 190, 190)', width: 'fit-content', alignItems: 'center', paddingBottom: '.2rem'}}>
                <p style={{fontWeight: 600, color: 'rgb(70,70,70)', fontSize: '1.1rem'}}>REVIEWS</p>
                <p style={{textAlign: 'center',backgroundColor: 'rgb(70, 70, 70)', padding: '.15rem .5rem',fontSize:'.8rem' ,color: 'white', fontWeight: 700, borderRadius:'.2rem'}}>270</p>
            </div>

            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', padding: '4rem 0 1rem', borderBottom: '.1rem solid rgb(30, 30, 30)', justifyContent: 'center'}}>
                <p style={{fontSize: '2.3rem', fontWeight: 600, color: 'rgb(70, 70, 70)',}}>4.7</p>
                <FiveStarsDisplay fontSize='1.6rem' color={'rgb(70,70,70)'} />
                <p style={{fontSize:'.8rem'}}>More than 2000 orders</p>
            </div>

            <div className='reviews-wrapper'>
                {listOfPages[indexOfCurrentPage].map((rev, index) => {
                    const nameVariants = getNameVariants(rev.displayName)
                    return (
                        <div key={index} className="review-container">
                            <AuthorInfo nameVariants={nameVariants} rev={rev} />

                            <div style={{display: 'flex',alignSelf:'flex-start', flexDirection: 'column', padding: '1.5rem',  gap: '.4rem' }}>
                                <FiveStarsDisplay fontSize='1.6rem' color={'rgb(70,70,70)'} />

                                <p>{rev.content}</p>

                                <div style={{display: 'flex', gap: '.15rem',alignSelf: 'flex-start' ,gridTemplateColumns: `repeat(${rev.photos.length}, 1fr)`, position: 'absolute', bottom: '1.5rem'}}>
                                  {rev.photos.map(photo => {
                                    return (
                                        <img style={{width: '4rem', height: '4rem'}} src={photo}/>
                                    )
                                    })}                                  
                                </div>
                            </div>

                            <div style={{display: 'flex', justifyContent: 'flex-end', padding: '2rem'}}>
                                <p>{getDateFromStamp(rev.date.seconds)}</p>
                            </div>
                        </div> 
                    )
                })}
            </div>
        </div>
      )   
    }
}

function AuthorInfo(props) {
    return (
        <div className="author-info">
            <div className="author-info-top">
                <div className="author-initials-wrapper">
                    {props.nameVariants.initials}
                </div>
                <p>{props.nameVariants.shortenedName}</p>
            </div>
            <div style={{color: '#0079cf', fontWeight: 400, fontSize: '.85rem'}} className="author-info-bottom">
                <MdVerifiedUser />
                <p>Verified Buyer</p>
            </div>
        </div>
    )
}

function getDateFromStamp(stampInSeconds) {
    let date = new Date(stampInSeconds * 1000);
    // console.log(date)
    date = date.toDateString()
    return date
}

//function takes desired reviews per page and array of reviews as params,
 //returns an array of pages, also arrays with reviews.
function paginateReviews(reviewsPerPage, allReviews){
    let allPages = [];
    let newPage = [];

    for (let i = 0; i < allReviews.length; i++) {
        newPage.push(allReviews[i]);
        if (newPage.length === reviewsPerPage) {
            allPages.push(newPage);
            newPage = [];
        };
    };
    if (newPage.length > 0) {
        allPages.push(newPage)
    }
    return allPages
};


function getNameVariants(name){
    const nameArr =name.split(' ');
    const firstName = nameArr[0];
    const lastName = nameArr[1];
    const initials = firstName[0] + lastName[0];
    const shortenedName = firstName + " " + lastName[0] + ".";
    const nameVariants = {initials, shortenedName};
    return nameVariants;
}

getNameVariants('Miguel Gil')
