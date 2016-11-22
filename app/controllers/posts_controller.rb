class PostsController < ApplicationController

  def index
    @post = Post.new
  end

  def all_posts
    @posts = Post.all
    render :json => @posts
  end

  def create
    @post = Post.new(post_params)
    sleep 8
    if @post.save
      render :json => @post
    else
      render :json => { :errors => @post.errors.full_messages }, :status => 422
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end
end