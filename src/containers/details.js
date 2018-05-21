'use strict;'

import { connect } from 'react-redux'
import ContentDetail from 'butter-component-content-details';

import {bindPersistActions} from '../redux/persist'
import {providerActions} from '../'

const ContentDetailContainer = connect (
    ({tabs, collections}, {match, history}) => {
        const tab = tabs[match.params.tab]
        const goBack = {
            action: history.goBack,
            title: tab.name
        }

        try {
            const col = collections[match.params.provider]
            const item = col.cache[match.params.id]
            const {isFetching} = collections[match.params.provider]

            return {
                ...item,
                isFetching,
                goBack
            }
        } catch (e) {
            return {
                goBack
            }
        }

    },
    (dispatch, {location, history, match}) => ({
        dispatch,
        actions: {
            ...bindPersistActions(dispatch),
            ...providerActions[match.params.provider],
            play: () => history.push(`${location.pathname}/play`)
        }
    })
)(ContentDetail)

export {ContentDetailContainer as default}