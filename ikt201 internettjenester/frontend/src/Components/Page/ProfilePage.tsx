import { createUseStyles } from 'react-jss'
import React, { ChangeEvent, useState } from 'react'
import profileImage from '../../../public/images/profiledefault.png'
import { DEFAULT_USER_IMAGE, IMAGE_NOT_FOUND } from '../../constants'
import { Link, RouteComponentProps } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardBody,
  CardTitle,
  ToastBody,
  CardLink,
  Row,
  Col,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ToastHeader,
  Toast,
  CardImg,
  FormGroup,
} from 'reactstrap'
import FormBase from '../Pages/FormBase'

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    msFlexDirection: 'row',
    minWidth: '10%',
    margin: '0 auto',
    padding: 10,
    flexBasis: 'max-content',
    flexDirection: 'row',
    height: '1000px',
    maxWidth: '50%',
    minHeight: '100%',
  },

  imgBox: {
    minWidth: '5%',
    maxWidth: '85%',
    wordWrap: 'break-word',
    backgroundColor: '#CCC5B9',
    borderColor: '#403D39',
  },

  tabBox: {
    position: 'relative',
    // maxWidth:"25%",
    minWidth: '50%',
    maxHeight: '50%',
    minHeight: '50%',
  },

  imageStyle: {
    maxWidth: '15%',
    borderRadius: '50%',
    marginLeft: '10%',
  },

  textbox: {
    fontFamily: 'Arial, Times New Roman',
    whiteSpace: 'break-spaces',
    overflowWrap: 'break-word',
    backgroundColor: '#FFFCF2',
  },

  toastHeader: {},

  inputField: {
    padding: '1rem',
    margin: '1rem',
    borderRadius: 10,
    outline: 'none',
    border: '2px solid #CCC5B9',
    fontSize: '0.9rem',
    '&:focus': {
      border: '2px solid #403D39',
    },
  },

  tabStyling: {},
})

type TParams = { profileId?: string | undefined }

interface IProfilePage extends RouteComponentProps<TParams> {}

interface IProfile {
  name: string
  lastname: string
  age: number
  profile: {
    _id: string
    about: string
    faq: string
    reviews: Array<{
      _id: string
      stars: number
      reviewText: string
      date: string
      user: {
        name: string
        lastname: string
      }
    }>
    ads: string
  }
}

interface IAddReview {
  profileId: string | undefined
}

function ProfilePage(props: IProfilePage) {
  const { match } = props
  const id = match.params.profileId

  const [{ response, isLoading, isError }, refetch] = useFetch<IProfile>({
    path: match.params.profileId
      ? '/user/profile/get?profileId=' + id
      : '/user/profile/get',
    method: 'GET',
  })

  const styles = useStyles()
  const [activeTab, setActiveTab] = React.useState('1')
  const Tabtoggle = (tab: React.SetStateAction<string>) => {
    refetch({
      path: match.params.profileId
        ? '/user/profile/get?profileId=' + id
        : '/user/profile/get',
      method: 'GET',
    })
    if (activeTab !== tab) setActiveTab(tab)
  }
  const [modal, setModal] = useState(false)
  const modalToggle = () => setModal(!modal)

  return (
    <div className={styles.root}>
      <div>
        <Card className={styles.imgBox}>
          <CardBody>
            <CardTitle tag="h5">
              {response?.name} {response?.lastname}
            </CardTitle>
          </CardBody>
          <img
            className={styles.imageStyle}
            width="100%"
            src={DEFAULT_USER_IMAGE}
            alt="Card image cap"
          />
          <CardBody>
            <CardLink href="#">Send message</CardLink>
            <CardLink href="#">Report User </CardLink>
            {match.params.profileId ? null : (
              <Button color="danger" onClick={modalToggle}>
                edit profile
              </Button>
            )}
            <Modal isOpen={modal} toggle={modalToggle}>
              <ModalHeader toggle={modalToggle}>Modal title</ModalHeader>
              <ModalBody>
                <EditProfile />
              </ModalBody>
              <Button
                color="secondary"
                onClick={modalToggle}
                className={styles.inputField}
              >
                Cancel
              </Button>
            </Modal>
          </CardBody>
        </Card>
      </div>
      <div className={styles.tabBox}>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                Tabtoggle('1')
              }}
            >
              About
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                Tabtoggle('2')
              }}
            >
              Faq
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => {
                Tabtoggle('3')
              }}
            >
              Reviews
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '4' ? 'active' : ''}
              onClick={() => {
                Tabtoggle('4')
              }}
            >
              Ads
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1" className={styles.textbox}>
            <Row>
              <Col sm="12">
                <p>{response?.profile?.about}</p>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12" className={styles.textbox}>
                <p>{response?.profile?.faq}</p>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12" className={styles.textbox}>
                {!isLoading && !isError ? (
                  response?.profile?.reviews.map((value, index) => {
                    return (
                      <div key={index}>
                        <Toast>
                          <ToastHeader className={styles.toastHeader}>
                            <div>
                              <strong>{value.user.name}</strong>
                              <small>{value.stars}/5</small>
                            </div>
                          </ToastHeader>
                          <ToastBody className={styles.textbox}>
                            {value.reviewText}
                            <p>Posted: {value.date}</p>
                          </ToastBody>
                        </Toast>
                      </div>
                    )
                  })
                ) : (
                  <p>Loading ....</p>
                )}
                {match.params.profileId ? <AddReview profileId={id} /> : null}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              <Col sm="12" className={styles.textbox}>
                <p>{response?.profile?.ads}</p>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </div>
  )
}

function EditProfile() {
  const [{ response, isLoading, isError }, repost] = useFetch<IProfile>({
    path: '/user/profile/updateProfile',
    method: 'POST',
  })
  const styles = useStyles()

  interface IProfile {
    about: string
    faq: string
    ads: string
  }
  const [message, setMessage] = useState<string>('')
  const [fieldsState, setFieldsState] = useState<IProfile>({
    about: '',
    faq: '',
    ads: '',
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setFieldsState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  return (
    <div>
      <FormBase>
        <input
          name={'about'}
          type="text"
          className={styles.inputField}
          placeholder="About text"
          onChange={handleChange}
          maxLength={256}
          required
        />
        <input
          name={'faq'}
          type="text"
          className={styles.inputField}
          placeholder="Faq text"
          defaultValue={response?.about}
          onChange={handleChange}
          required
        />
        <input
          name={'ads'}
          type="text"
          className={styles.inputField}
          placeholder="Ads text"
          onChange={handleChange}
          required
        />
        <Button
          onClick={() => {
            repost({
              path: '/user/profile/updateProfile',
              method: 'POST',
              body: {
                about: fieldsState.about,
                faq: fieldsState.faq,
                ads: fieldsState.ads,
              },
            })
          }}
        >
          Submit
        </Button>
      </FormBase>
    </div>
  )
}

function AddReview(props: IAddReview) {
  const [{ response, isLoading, isError }, repost] = useFetch<IProfile>({
    path: props.profileId
      ? '/user/profile/addReview?profileId=' + props.profileId
      : '/user/profile/addReview',
    method: 'POST',
  })

  const styles = useStyles()

  interface IReview {
    stars: number
    reviewText: string
  }
  const [message, setMessage] = useState<string>('')
  const [fieldsState, setFieldsState] = useState<IReview>({
    stars: 50,
    reviewText: '',
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setFieldsState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }
  return (
    <div>
      <FormBase>
        <input
          name={'reviewText'}
          type="text"
          className={styles.inputField}
          placeholder="Review text"
          onChange={handleChange}
          maxLength={256}
          minLength={24}
          required
        />
        <input
          name={'stars'}
          type="number"
          max={5}
          className={styles.inputField}
          placeholder="stars"
          onChange={handleChange}
          required
        />
        <Button
          onClick={() => {
            repost({
              path: props.profileId
                ? '/user/profile/addReview?profileId=' + props.profileId
                : '/user/profile/addReview',
              method: 'POST',
              body: {
                stars: fieldsState.stars,
                reviewText: fieldsState.reviewText,
              },
            })
          }}
        >
          Submit
        </Button>
      </FormBase>
    </div>
  )
}

export default React.memo(ProfilePage)
