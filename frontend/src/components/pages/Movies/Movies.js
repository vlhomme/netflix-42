
import React from "react";
import Header from '../../common/Header';
import Sidebar from '../../common/SideBar';
import Footer from '../../common/Footer';
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { getAllMaterials } from '../../../store/actions/materialAction/getAllMaterials'
import parse from 'html-react-parser';
import { Link } from "react-router-dom";
import { storeMaterialDetails } from '../../../store/actions/materialAction/StoreMaterialDetails';
import { getCategoriesList } from '../../../store/actions/materialAction/getCategoriesList';
import { getFilteredMaterials } from '../../../store/actions/materialAction/filterMaterialByCategoryAction';
import { getUserStats } from '../../../store/actions/StatsActions/getStatsAction';
import { getMoviesByRatings } from '../../../store/actions/moviesActions/getMoviesByRatingAction';
import { getMovieViewsByUser } from '../../../store/actions/moviesActions/getMovieViewbyUserAction';
import { getMoviesFromSource } from '../../../store/actions/moviesActions/getMultiSourceMoviesAction';
const page1 = require('./page1');
const categorys = require('./genre');
const genres = categorys.data;


class Training extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '&sort_by=rating',
            query_term: '',
            allUserViewedMovies: [],
            decadeFilter: undefined,
            page: 0,
            userId: localStorage.getItem("userId"),
            pageMovie: 1,
            totalMovies: 0,
            allMovies: [],
            loading: <div class="container">
                <div class="row">
                    <div class="animationload">
                        <div class="osahanloading"></div>
                    </div>
                </div>
            </div>,
            onLoading: "",
            selectedCategory: "",
            ratingMin: 0,
            genres: [],
            allMaterials: [],
            currentPagination: 0,
            allPagination: [],
            numberOfPages: 1,
            sort_by: 'rating',
            order_by: 'desc'
        }
        this.handleChangeFilterCat = this.handleChangeFilterCat.bind(this);
        this.handleChangeInputText = this.handleChangeInputText.bind(this);
        this.initPagination = this.initPagination.bind(this);
        this.goToMaterialDatails = this.goToMaterialDatails.bind(this);
        this.activePagination = this.activePagination.bind(this);
        this.goToMovieDatails = this.goToMovieDatails.bind(this);


    }

    async componentDidMount() {
        this.setState({ onLoading: this.state.loading })
        window.addEventListener('scroll', this.handleScrollDown);
    }

    handleChangeInputText(event) {
        this.setState({ query_term: event.target.value });
        let query = this.state.query.replace(/&sort_by=[^&]+/g, '') + `&sort_by=title`;

        this.setState({
            sort_by: 'title',
            query
        })
    }

    async handleChangeFilterCat(event) {
        this.setState({
            allMovies: [],
            pageMovie: 1
        });
        // window.addEventListener('scroll', this.handleScrollDown, true);

        const target = event.target;
        const value = target.value;
        if (event.target.name !== 'query_term') {
            this.setState({
                [target.name]: value,
                currentPagination: 0,
            });
        }

        let query = '';

        this.setState({ onLoading: this.state.loading })
        switch (target.name) {
            case 'selectedCategory':
                query = this.state.query.replace(/&genre=[^&]+/g, '') + `&genre=${value}`;
                this.setState({
                    query: query
                })
                setTimeout(async () => {
                    await this.props.onGetMoviesByRatings(query, 1, this.state.decadeFilter);
                }, 20);
                break;
            case 'ratingMin':
                query = this.state.query.replace(/&minimum_rating=[^&]+/g, '') + `&minimum_rating=${value}`;
                this.setState({
                    query: query
                })
                setTimeout(async () => {
                    await this.props.onGetMoviesByRatings(query, 1, this.state.decadeFilter);
                }, 20);
                break;
            case 'query_term':
                query = this.state.query.replace(/&query_term=[^&]+/g, '') + `&query_term=${this.state.query_term}`;
                this.setState({
                    query: query
                })
                setTimeout(async () => {
                    await this.props.onGetMoviesByRatings(query, 1, this.state.decadeFilter);
                }, 20);
                break;
            case 'sort_by':
                query = this.state.query.replace(/&sort_by=[^&]+/g, '') + `&sort_by=${value}`;
                this.setState({
                    query: query
                })
                setTimeout(async () => {
                    await this.props.onGetMoviesByRatings(query, 1, this.state.decadeFilter);
                }, 20);
                break;
            case 'order_by':
                query = this.state.query.replace(/&order_by=[^&]+/g, '') + `&order_by=${value}`;
                this.setState({
                    query: query
                })
                setTimeout(async () => {
                    await this.props.onGetMoviesByRatings(query, 1, this.state.decadeFilter);
                }, 20);
                break;
            case 'decadeFilter':
                if (!value || value.length === 0) {
                    this.setState({
                        decadeFilter: undefined
                    })
                } else {
                    this.setState({
                        decadeFilter: value.split('-')
                    })
                }
                setTimeout(async () => {
                    await this.props.onGetMoviesByRatings(this.state.query, this.state.pageMovie, this.state.decadeFilter);
                }, 20);
                break;
        }
    }

    async activePagination(event) {
        this.setState({
            currentPagination: parseInt(event.target.id, 10)
        })
        await this.initPagination();
        if (this.state.selectedCategory === "")
            await this.props.onGetAllMaterials(this.state.currentPagination);
        else
            await this.props.onGetFilteredMaterials(this.state.currentPagination, this.state.selectedCategory)
    }

    goToMaterialDatails(material) {
        this.props.onStoreMaterialDetails(material);
    }

    goToMovieDatails(e, movie) {
        //e.preventDefault();
        window.removeEventListener('scroll', this.handleScrollDown);
        this.props.onStoreMaterialDetails(movie);
    }

    async FilterSearchByGenre(query) {
        this.setState({ onLoading: this.state.loading })
        this.setState({
            allMovies: [],
        });

        let page = 1;
        this.setState({
            pageMovie: page
        });
        await this.props.onGetMoviesByRatings(query, page);
    }


    handleScrollDown = async () => {
        // console.log("ssss", window.innerHeight + document.documentElement.scrollTop, document.documentElement.offsetHeight)
        // if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        //     console.log("111ssss")
        // }

        if (document.documentElement.offsetHeight - parseInt(window.innerHeight + document.documentElement.scrollTop) <= 5) {
            let page = this.state.pageMovie + 1;
            this.setState({
                pageMovie: page
            })

            if (this.state.pageMovie > this.state.numberOfPages) {
                // window.removeEventListener('scroll', this.handleScrollDown, true);
                return
            } else {
                this.setState({ onLoading: this.state.loading })
                let query = this.state.query;
                await this.props.onGetMoviesByRatings(query, page, this.state.decadeFilter);
                document.documentElement.scrollTop = document.documentElement.scrollTop - 200;
            }
        };
    }

    async UNSAFE_componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScrollDown, true);
    }

    async UNSAFE_componentWillMount() {
        this.setState({ onLoading: this.state.loading })
        await this.props.getMoviesFromSource();

        //   await this.props.onGetAllMaterials(this.state.page);
        let query = "&sort_by=rating"
        // await this.props.onGetCategoriesList();
        this.setState({ genres: genres });
        // await this.props.onGetMoviesByRatings(query, this.state.pageMovie, [1990, 2000]);
        await this.props.onGetMoviesByRatings(query, this.state.pageMovie);
        //   await this.props.onGetUserStats();
        await this.props.onGetMovieViewsByUser(this.state.userId);
    }

    checkIfMovieViewed(movieId) {
        let i = 0;
        let check = 0;

        while (i < this.state.allUserViewedMovies.length) {
            if (parseInt(this.state.allUserViewedMovies[i].movieId) === parseInt(movieId)) {
                check = 1;
            }
            i++;
        }

        if (check === 1)
            return <span style={{ 'width': '60px', 'top': '20px', 'left': '30px' }} class="badge badge-info"> Viewed</span>
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.allMoviesByRatings !== undefined && nextProps.allMoviesByRatings.movies) {
            let moviesOld = this.state.allMovies;
            if (nextProps.allMoviesByRatings.movies !== undefined && nextProps.allMoviesByRatings.movies !== null)
                if (nextProps.allMoviesByRatings.movies.length > 0) {
                    moviesOld = moviesOld.concat(nextProps.allMoviesByRatings.movies);

                    this.setState({
                        allMovies: moviesOld,
                        totalMovies: Math.floor(nextProps.allMoviesByRatings.movie_count / 20),
                        numberOfPages: Math.floor(nextProps.allMoviesByRatings.movie_count / 20) + 1
                    })
                    this.setState({ onLoading: "" })
                }


        } else {
            // For testing when blocked
            this.setState({
                // allMovies: page1.page1.data.movies
                allMovies: [],
            })
            this.setState({ onLoading: "" })
        }

        if (nextProps.getMovieViews !== undefined && nextProps.getMovieViews.code === 200) {
            this.setState({
                allUserViewedMovies: nextProps.getMovieViews.data,
            })
        }

        if (this.state.selectedCategory !== "")
            this.setState({
                allMaterials: nextProps.filteredMaterials
            })
        else
            this.setState({
                allMaterials: nextProps.allMaterials
            })

        this.setState({ onLoading: "" })
    }

    async prevPage() {
        let page = 0;
        if (this.state.pageMovie > 1) {
            page = this.state.pageMovie - 1;
            this.setState({
                pageMovie: page
            })
            let query = this.state.query;
            await this.props.onGetMoviesByRatings(query, page, this.state.decadeFilter);

        }
    }

    async nextPage() {
        let page = 0;
        if (this.state.pageMovie < this.state.totalMovies) {
            page = this.state.pageMovie + 1;
            this.setState({
                pageMovie: page
            })
            let query = this.state.query;
            await this.props.onGetMoviesByRatings(query, page, this.state.decadeFilter);

        }
    }

    initPagination(active) {
        let allPagination = [];
        let totalPage = 0;

        if (this.state.selectedCategory !== "")
            totalPage = this.props.totalPageFiltered
        else
            totalPage = this.props.totalPage;

        for (var i = 0; i < totalPage; i++) {
            if (i === this.state.currentPagination)
                allPagination.push(<li onClick={this.activePagination} key={i} className="active"><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
            else
                allPagination.push(<li onClick={this.activePagination} key={i}><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
        }
        i = 0;
        return allPagination;
    }

    render() {
        const ratings = ['0/10',
            '1/10',
            '2/10',
            '3/10',
            '4/10',
            '5/10',
            '6/10',
            '7/10',
            '8/10',
            '9/10'
        ]
        const years = [
            '1900-1910',
            '1910-1920',
            '1920-1930',
            '1930-1940',
            '1940-1950',
            '1950-1960',
            '1960-1970',
            '1970-1980',
            '1980-1990',
            '1990-2000',
            '2000-2010',
            '2010-2020'
        ]

        return (
            <div>
                <Header />
                <Sidebar />
                {this.state.onLoading}
                <div>
                    <div className="content-wrapper">
                        <section className="content">

                            <div className="row" id="fixMarginTop">

                            </div>
                            <div className="content">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="box box-primary">
                                            <div className="box-header with-border">
                                                <h3 className="box-title">Movies list</h3>

                                                <div className="box-tools pull-right">
                                                    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                                                    </button>
                                                    <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                                                </div>
                                            </div>
                                            <div className="box-body">
                                                <div className="row" id="infinite-list">


                                                    <form className="form-inline margin">
                                                        <div className="form-group margin">
                                                            <input type="text" className="form-control" placeholder="filter by title" onChange={this.handleChangeInputText} />
                                                            <button type="button" className="btn btn-primary btn-flat" name="query_term" onClick={this.handleChangeFilterCat}>search!</button>
                                                        </div>
                                                        <div className="form-group margin">
                                                            <label style={{ marginRight: "15px" }} >Filter by category</label>
                                                            <select className="form-control" name="selectedCategory" onChange={this.handleChangeFilterCat} placeholder="Enter category">
                                                                <option value="" >Select</option>
                                                                {this.state.genres.map((genre, index) => {
                                                                    return (
                                                                        <option key={index} value={genre} >{genre}</option>
                                                                    )
                                                                })}   </select>
                                                        </div>

                                                        <div className="form-group margin">
                                                            <label style={{ marginRight: "15px" }} >Filter by minimum rating</label>
                                                            <select className="form-control" name="ratingMin" onChange={this.handleChangeFilterCat} placeholder="Enter rating">
                                                                <option value="" >Select</option>
                                                                {ratings.map((rating, index) => {
                                                                    return (
                                                                        <option key={index} value={parseInt(rating.substr(0, 1))} >{rating}</option>
                                                                    )
                                                                })}   </select>
                                                        </div>
                                                        <div className="form-group margin">
                                                            <label style={{ marginRight: "15px" }} >Filter by decade</label>
                                                            <select className="form-control" name="decadeFilter" onChange={this.handleChangeFilterCat} placeholder="Enter rating">
                                                                <option value="" >Select</option>
                                                                {years.map((yearz, index) => {
                                                                    // var array = [];
                                                                    // array = yearz.split('-');
                                                                    return (
                                                                        <option key={index} value={yearz} >{yearz}</option>
                                                                    )
                                                                })}   </select>
                                                        </div>

                                                        <h3 className="margin">Sort by :</h3>
                                                        <form>
                                                            <div className="form-group margin">
                                                                <label style={{ marginRight: "15px" }} >Title alphabetical</label>
                                                                <input type="radio" name="sort_by" onChange={this.handleChangeFilterCat} value="title" checked={this.state.sort_by === 'title'}></input>
                                                            </div>
                                                            <div className="form-group margin">
                                                                <label style={{ marginRight: "15px" }} >Rating</label>
                                                                <input type="radio" name="sort_by" onChange={this.handleChangeFilterCat} value="rating" checked={this.state.sort_by === 'rating'}></input>
                                                            </div>
                                                            <div className="form-group margin">
                                                                <label style={{ marginRight: "15px" }} >Production Year</label>
                                                                <input type="radio" name="sort_by" onChange={this.handleChangeFilterCat} value="year" checked={this.state.sort_by === 'year'}></input>
                                                            </div>
                                                        </form>
                                                        <form>
                                                            <div className="form-group margin">
                                                                <label style={{ marginRight: "15px" }} >Increasing</label>
                                                                <input type="radio" name="order_by" onChange={this.handleChangeFilterCat} value="asc" checked={this.state.order_by === 'asc'}></input>
                                                            </div>
                                                            <div className="form-group margin">
                                                                <label style={{ marginRight: "15px" }} >Decreasing</label>
                                                                <input type="radio" name="order_by" onChange={this.handleChangeFilterCat} value="desc" checked={this.state.order_by === 'desc'}></input>
                                                            </div>
                                                        </form>
                                                    </form>
                                                    <br></br>


                                                    <span>
                                                        {this.state.allMovies && this.state.allMovies.length > 0 ? this.state.allMovies.map(movie => {
                                                            return (
                                                                <div key={movie.id} className="col-md-3">
                                                                    <div id={movie.id} className="listLessons card-content">
                                                                        <div className="card-img">
                                                                            <img src={movie.medium_cover_image} alt="" />
                                                                            {this.checkIfMovieViewed(movie.id)}
                                                                        </div>
                                                                        <div className="card-desc" style={{ overflowWrap: 'break-word' }}>
                                                                            <h3 style={{ 'whiteSpace': 'nowrap', 'overflow': 'hidden', 'textOverflow': 'ellipsis' }}>{movie.title}</h3>
                                                                            <h5><b>Rating : </b>{movie.rating}</h5>
                                                                            <div style={{ 'whiteSpace': 'nowrap', 'overflow': 'hidden', 'textOverflow': 'ellipsis' }}>
                                                                                {parse(movie.summary)}
                                                                            </div>
                                                                            <br></br>
                                                                            <Link to="/videodetails" >
                                                                                <button type="button" onClick={(e) => { this.goToMovieDatails(e, movie) }} className="btn-card" style={{ fontSize: "12px", fontWeight: "bold" }}>See more</button>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }) : ""}
                                                    </span>



                                                </div>

                                                {/* <div class="paginate" style={{ 'width': '600px' }}>
                                                    <ul class="pagination">
                                                        <li onClick={(e) => { this.prevPage() }} ><a href="#" rel="prev" class="page-prev"><span class="glyphicon glyphicon-chevron-left"></span></a></li>
                                                        <li ><span>Page {this.state.pageMovie} of {this.state.totalMovies}</span></li>
                                                        <li onClick={(e) => { this.nextPage() }}><a href="#" rel="next" class="page-next"><span class="glyphicon glyphicon-chevron-right"></span></a></li>
                                                    </ul>
                                                    <div class="clearfix"></div>
                                                </div> */}



                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const state = (state, ownProps = {}) => {
    return {
        getMovieViews: state.getMovieViews.getMovieViews,
        allMoviesByRatings: state.allMoviesByRatings.allMoviesByRatings.data,
        location: state.location,
        userStats: state.getUserStats.userStat,
        filteredMaterials: state.filteredMaterials.listFilteredCategories.data,
        allMaterials: state.allMaterials.allMaterials.data,
        totalPage: state.allMaterials.allMaterials.total_pages + 1,
        totalPageFiltered: state.filteredMaterials !== undefined ? state.filteredMaterials.listFilteredCategories.total_pages + 1 : 0
        // listCats: state.getCategoriesList.listCategories
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        navigateTo: (location) => {
            dispatch(push(location));
        },
        onGetAllMaterials: (page) => dispatch(getAllMaterials(page)),
        onStoreMaterialDetails: (data) => dispatch(storeMaterialDetails(data)),
        onGetCategoriesList: () => dispatch(getCategoriesList()),
        onGetFilteredMaterials: (page, catId) => dispatch(getFilteredMaterials(page, catId)),
        onGetUserStats: () => dispatch(getUserStats()),
        onGetMoviesByRatings: (query, page, decadeFilter) => dispatch(getMoviesByRatings(query, page, decadeFilter)),
        onGetMovieViewsByUser: (userId) => dispatch(getMovieViewsByUser(userId)),
        getMoviesFromSource: () => dispatch(getMoviesFromSource())
    }
};

export default connect(state, mapDispatchToProps)(Training);