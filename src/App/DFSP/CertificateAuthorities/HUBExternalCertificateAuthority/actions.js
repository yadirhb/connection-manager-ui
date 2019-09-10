/******************************************************************************
 *  Copyright 2019 ModusBox, Inc.                                             *
 *                                                                            *
 *  info@modusbox.com                                                         *
 *                                                                            *
 *  Licensed under the Apache License, Version 2.0 (the "License");           *
 *  you may not use this file except in compliance with the License.          *
 *  You may obtain a copy of the License at                                   *
 *  http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                            *
 *  Unless required by applicable law or agreed to in writing, software       *
 *  distributed under the License is distributed on an "AS IS" BASIS,         *
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 *  See the License for the specific language governing permissions and       *
 *  limitations under the License.                                            *
 ******************************************************************************/

import { createAction } from 'redux-actions';
import api from 'utils/api';
import { is200 } from 'utils/http';
import { downloadFile } from 'utils/html';
import { getEnvironmentId } from 'App/selectors';

export const RESET_DFSP_HUB_EXTERNAL_CA = 'DFSP HUB EXTERNAL CA / Reset';
export const SET_DFSP_HUB_EXTERNAL_CA_ERROR = 'DFSP HUB EXTERNAL CA / Set Root Cert Error';
export const SET_DFSP_HUB_EXTERNAL_CA_CERTIFICATES = 'DFSP HUB EXTERNAL CA / Set Certificates';
export const SHOW_DFSP_HUB_EXTERNAL_CA_ROOT_CERTIFICATE_MODAL = 'DFSP HUB EXTERNAL CA / Show Root Certificate Modal';
export const HIDE_DFSP_HUB_EXTERNAL_CA_ROOT_CERTIFICATE_MODAL = 'DFSP HUB EXTERNAL CA / Hide Root Certificate Modal';
export const SHOW_DFSP_HUB_EXTERNAL_CA_INTERMEDIATE_CHAIN_MODAL =
  'DFSP HUB EXTERNAL CA / Show Intermediate Chain Modal';
export const HIDE_DFSP_HUB_EXTERNAL_CA_INTERMEDIATE_CHAIN_MODAL =
  'DFSP HUB EXTERNAL CA / Hide Intermediate Chain Modal';

export const resetDfspHubExternalCa = createAction(RESET_DFSP_HUB_EXTERNAL_CA);
export const setDfspHubExternalCaError = createAction(SET_DFSP_HUB_EXTERNAL_CA_ERROR);
export const setDfspHubExternalCaCertificates = createAction(SET_DFSP_HUB_EXTERNAL_CA_CERTIFICATES);
export const showDfspHubExternalCaRootCertificateModal = createAction(SHOW_DFSP_HUB_EXTERNAL_CA_ROOT_CERTIFICATE_MODAL);
export const hideDfspHubExternalCaRootCertificateModal = createAction(HIDE_DFSP_HUB_EXTERNAL_CA_ROOT_CERTIFICATE_MODAL);
export const showDfspHubExternalCaIntermediateChainModal = createAction(
  SHOW_DFSP_HUB_EXTERNAL_CA_INTERMEDIATE_CHAIN_MODAL
);
export const hideDfspHubExternalCaIntermediateChainModal = createAction(
  HIDE_DFSP_HUB_EXTERNAL_CA_INTERMEDIATE_CHAIN_MODAL
);

export const storeDfspHubExternalCas = () => async (dispatch, getState) => {
  const environmentId = getEnvironmentId(getState());
  const { data, status } = await dispatch(api.hubExternalCas.read({ environmentId }));
  if (is200(status)) {
    dispatch(setDfspHubExternalCaCertificates(data));
  } else {
    dispatch(setDfspHubExternalCaError(data));
  }
};
export const downloadDfspHubExternalCaRootCertificate = ({ cert, name }) => (dispatch, getState) => {
  downloadFile(cert, `hub-${name}-root.pem`);
};

export const downloadDfspHubExternalCaIntermediateChain = ({ cert, name }) => (dispatch, getState) => {
  downloadFile(cert, `hub-${name}-intermediates.pem`);
};
