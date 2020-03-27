import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxilliary/Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);
    const reqInterceptor = axios.interceptors.request.use(req => {
      setError(null);
      return req;
    });

    const resInterceptor = axios.interceptors.response.use(null, err => {
      setError(err);
      return Promise.reject(error);
    });

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);
    const setErrorNullHandler = () => setError(null);
    return (
      <Aux>
        <Modal show={error} modalClosed={setErrorNullHandler}>
          {error ? error.message : null}
        </Modal>

        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
