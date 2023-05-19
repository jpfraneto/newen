import React, { useState } from 'react';
import Image from 'next/image';
import { Righteous } from 'next/font/google';

import { formatDistance, subDays } from 'date-fns';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

function Comments({
  sadhanaDayId,
  sadhanaId,
  dayNumber,
  sadhanaDayComments,
  currentUser,
  setSadhanaDayComments,
}) {
  const [newComment, setNewComment] = useState('');
  const [newCommentBtnText, setNewCommentBtnText] = useState('Add Comment');
  const [now, setNow] = useState(new Date());

  const handleSubmit = async () => {
    setNewCommentBtnText('Commenting...');
    const response = await fetch(
      `/api/sadhana/${sadhanaId}/day/${dayNumber}/comment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          sadhanaDayId: sadhanaDayId,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setSadhanaDayComments(prev => {
        if (prev) return [...prev, data.comment];
        else return [data.comment];
      });
      setNewCommentBtnText('Comment Added!');
      setTimeout(() => {
        setNewCommentBtnText('Add comment');
      }, 2000);
      setNewComment('');
    } else {
      // Handle error
    }
  };

  const handleEditComment = async commentId => {
    // Get the comment to edit
    const commentToEdit = sadhanaDayComments.find(
      comment => comment.id === commentId
    );

    // Prompt the user to enter the new content
    const newContent = prompt('Edit your comment:', commentToEdit.content);

    // If the user canceled the prompt or didn't change the content, return early
    if (!newContent || newContent === commentToEdit.content) return;

    // Send a request to update the comment
    const response = await fetch(
      `/api/sadhana/${sadhanaId}/day/${dayNumber}/comment/${commentId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newContent,
          sadhanaDayId,
        }),
      }
    );

    if (response.ok) {
      // Update the comment's content in the state
      const updatedCommentIndex = sadhanaDayComments.findIndex(
        comment => comment.id === commentId
      );
      sadhanaDayComments[updatedCommentIndex].content = newContent;
      setSadhanaDayComments([...sadhanaDayComments]);
    } else {
      // Handle error
    }
  };

  return (
    <div className='w-full bg-gray-300 pt-2 rounded-xl'>
      <h4
        className={`${righteous.className} text-left mb-2 text-4xl  font-bold`}
      >
        Comments
      </h4>
      {sadhanaDayComments ? (
        <div className='space-y-4'>
          {sadhanaDayComments.map(comment => (
            <div key={comment.id} className='flex bg-gray-400 rounded p-2'>
              <div className='flex flex-col items-start'>
                {' '}
                <Image
                  src={comment.author.image || '/images/ankycompressed.png'}
                  width={40}
                  height={40}
                  alt={comment.author.username}
                  className='w-12 h-12 rounded-full mr-4'
                />
                <span className='font-semibold'>
                  {comment.author.username || comment.author.email}
                </span>
                <span className='text-sm text-left text-gray-500'>
                  {formatDistance(new Date(comment.createdAt), now, {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <div className='relative flex w-full px-2'>
                <p className=''>{comment.content}</p>
                {currentUser.id === comment.authorId && (
                  <span
                    onClick={() => handleEditComment(comment.id)}
                    className='text-sm absolute bottom-0 left-0 px-2 pb-1 text-blue-500 hover:text-black hover:cursor-pointer mt-2'
                  >
                    Edit Comment
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>There are no comments yet.</p>
      )}
      <div className='mt-4'>
        <textarea
          placeholder='Add a comment to this day'
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          className='w-full h-24 p-2 resize-none mb-2 rounded  text-black'
        />
        <button
          onClick={handleSubmit}
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          {newCommentBtnText}
        </button>
      </div>
    </div>
  );
}

export default Comments;
