import React, { useEffect, useRef, useState } from "react";
import { db } from "./firebaseConfig";
import { collection, getDoc, doc } from "firebase/firestore";
import FiveStarsDisplay from "./FiveStarsDisplay";
import {MdVerifiedUser} from 'react-icons/md'
import styles from '../styles.module.css'

export default function Reviews() {
    const [retrievedReviews, setRetrievedReviews] = useState(null);
    const [listOfPages, setListOfPages] = useState(null)
    const [indexOfCurrentPage, setIndexOfCurrentPage] = useState(0);
    const currentPageRef = useRef(null)


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
            const pages = paginateReviews(10, retrievedReviews);
            setListOfPages(pages)
        }
    }, [retrievedReviews])

    function handlePageSelectionClick(e, index){
        console.log(e)
        currentPageRef.current.style.border = 'none'
        setIndexOfCurrentPage(index)
    }

    useEffect(() => {
        if(currentPageRef.current){
            let current = currentPageRef.current;
            current.style.borderBottom = '2px solid rgb(30,30,30)'
            current.style.borderTop = '2px solid rgb(30,30,30)'
        }
    })
    
    if(listOfPages){
      return (
        <div className={styles.reviewPageContainer}>
            <div className={styles.currentViewReviews}>
                <p className={styles.reviewsButtonText}> REVIEWS </p>
                <p className={styles.totalReviewsText}> 270 </p>
            </div>

            <div className={styles.averageReviewContainer}>
                <p className={styles.totalAverageText}> 4.7 </p>

                <FiveStarsDisplay
                   class={styles.averageStarsDisplay}
                   fontSize='1.6rem'
                   color={'rgb(70,70,70)'}
                   starsContainerMessage="More than 2000 orders"
                />
            </div>

            <div className='reviews-wrapper' style={{gridTemplateRows: `repeat(${10}, 1fr)`}}>
                {listOfPages[indexOfCurrentPage].map((rev, index) => {
                    const nameVariants = getNameVariants(rev.displayName)
                    return (
                        <div key={index} className="review-container">
                            <AuthorInfo nameVariants={nameVariants} rev={rev} />

                            <div className={styles.reviewContentContainer}>
                                <FiveStarsDisplay fontSize='1.6rem' color={'rgb(70,70,70)'} />

                                <p className={styles.reviewContentText}>{rev.content}</p>

                                <div className={styles.reviewImagesContainer}>
                                  {rev.photos.map(photo => {
                                    return (
                                        <img style={{width: '4rem', height: 'auto'}} src={photo}/>
                                    )
                                    })}                                  
                                </div>
                            </div>

                            <div className={styles.reviewDateContainer}>
                                <p>{getDateFromStamp(rev.date.seconds)}</p>
                            </div>
                        </div> 
                    )
                })}
                <div className="page-select-container">
                {listOfPages.map((page, index) => {
                    
                    return (
                        <button ref={index === indexOfCurrentPage ? currentPageRef : null} key={index} onClick={(e)=>handlePageSelectionClick(e ,index)} className="page-select-button">{index + 1}</button>
                    )
                })}
            </div>
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
            <div style={{color: '#39d38c', fontWeight: 400, fontSize: '.88rem', textShadow: '0 0 .7px 3px black'}} className="author-info-bottom">
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
