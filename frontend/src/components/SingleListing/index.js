import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchListing } from '../../store/listings';


const SingleCow = () => {
    const {productId} = useParams();
    const dispatch = useDispatch();

    const listing = useSelector(state => state.listings.singleListing)

    useEffect(() => {
        dispatch(fetchListing(productId))
    }, [dispatch])
}