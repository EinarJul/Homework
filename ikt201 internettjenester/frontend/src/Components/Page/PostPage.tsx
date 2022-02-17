import * as React from 'react'
import { createUseStyles } from 'react-jss'
import useFetch from '../../hooks/useFetch'
import PageBase from '../Pages/PageBase'
import { Link, RouteComponentProps } from 'react-router-dom'
import {
  Col,
  Row,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Spinner,
} from 'reactstrap'

type TParams = { id?: string | undefined; slug?: string | undefined }

interface IPostPage extends RouteComponentProps<TParams> {}

interface IPost {
  description: string
  image: string
  name: string
  slug: string
  user: IUser
  reviews: Array<IReview>
}

interface IReview {
  _id: string
  date: string
  postedBy: IUser
  reviewText: string
}

interface IUser {
  _id: string
  nickname: string
}

const useStyles = createUseStyles({
  postTitle: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  postCreator: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  imageWrapper: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  postDescription: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  postReviews: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  reviewColumns: {
    margin: '1rem',
  },
})

function PostPage(props: IPostPage) {
  const { match } = props
  const styles = useStyles()
  const slug = match.params.slug ? match.params.slug : null

  const [{ response, isLoading, isError }, refetch] = useFetch<IPost>({
    path: '/posts/get?slug=' + slug,
    method: 'GET',
  })

  const data = response && response

  return (
    <PageBase>
      <div className="container">
        {isLoading ? (
          <Spinner color="dark" />
        ) : (
          <Row>
            <Col>
              <div className={styles.postTitle}>
                <h1>{data && data.name}</h1>
                <div className={styles.postCreator}>
                  <img src={''} alt={'Test user image'} />
                  <Link to={'/account/profile/' + (data && data.user._id)}>
                    {data && data.user.nickname}
                  </Link>
                </div>
              </div>

              <div className={styles.imageWrapper}>
                <img
                  src={
                    data && data.image
                      ? data.image
                      : process.env.PUBLIC_URL + '/image-not-found.jpg'
                  }
                  className="img-fluid"
                  alt="Responsive image"
                />
              </div>
              <div className={styles.postDescription}>
                <h3>Description</h3>
                <p>{data && data.description}</p>
              </div>
              <div className={styles.postReviews}>
                <h3>Reviews</h3>
                <Row>
                  {data &&
                    data.reviews.map((value) => (
                      <Col xs="auto" className={styles.reviewColumns}>
                        <Card>
                          <CardBody>
                            <CardTitle tag="h5">
                              <Link
                                to={'/account/profile/' + value.postedBy._id}
                              >
                                {value.postedBy.nickname}
                              </Link>
                            </CardTitle>
                            <CardText>{value.reviewText}</CardText>
                            <CardText>
                              <small className="text-muted">
                                {value.date && 'Posted: ' + value.date}
                              </small>
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </div>
            </Col>
            <Col>right</Col>
          </Row>
        )}
      </div>
    </PageBase>
  )
}

export default PostPage
