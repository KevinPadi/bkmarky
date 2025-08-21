import BookmarksSkeleton from "@/components/bookmarks/bookmarks-skeleton";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useFolderStore } from "@/stores/global-state";
import BookmarksError from "./bookmark-error";
import BookmarkItem from "./bookmark-item";
import { MotionEffect } from "../animate-ui/effects/motion-effect";
import { AnimatePresence } from "motion/react";

const BookmarksList = () => {
  const { bookmarks, isLoading, isError } = useBookmarks();
  const activeFolder = useFolderStore((s) => s.activeFolder);

  if (isLoading) return <BookmarksSkeleton />;
  if (isError) return <BookmarksError />;

  if (!activeFolder) {
    return (
      <div className="text-center text-accent-foreground py-8">
        <div className="mb-5 flex items-center justify-center">
          <svg
            className="size-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <title>folders</title>
            <g fill="none">
              <path
                d="M13.2 4C14.8802 4 15.7202 4 16.362 4.32698C16.9265 4.6146 17.3854 5.07354 17.673 5.63803C18 6.27976 18 7.11984 18 8.8V11.2C18 12.8802 18 13.7202 17.673 14.362C17.3854 14.9265 16.9265 15.3854 16.362 15.673C15.7202 16 14.8802 16 13.2 16H5.8C4.11984 16 3.27976 16 2.63803 15.673C2.07354 15.3854 1.6146 14.9265 1.32698 14.362C1 13.7202 1 12.8802 1 11.2L1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1L7.28741 1C7.91355 1 8.22663 1 8.5108 1.0863C8.76238 1.1627 8.99643 1.28796 9.19955 1.45491C9.42899 1.64349 9.60265 1.90398 9.94997 2.42496L11 4H13.2Z"
                fill="url(#1752500502787-3657460_folders_existing_0_vc2b9m2yx)"
                data-glass="origin"
                mask="url(#1752500502787-3657460_folders_mask_u980pffha)"
              ></path>
              <path
                d="M13.2 4C14.8802 4 15.7202 4 16.362 4.32698C16.9265 4.6146 17.3854 5.07354 17.673 5.63803C18 6.27976 18 7.11984 18 8.8V11.2C18 12.8802 18 13.7202 17.673 14.362C17.3854 14.9265 16.9265 15.3854 16.362 15.673C15.7202 16 14.8802 16 13.2 16H5.8C4.11984 16 3.27976 16 2.63803 15.673C2.07354 15.3854 1.6146 14.9265 1.32698 14.362C1 13.7202 1 12.8802 1 11.2L1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1L7.28741 1C7.91355 1 8.22663 1 8.5108 1.0863C8.76238 1.1627 8.99643 1.28796 9.19955 1.45491C9.42899 1.64349 9.60265 1.90398 9.94997 2.42496L11 4H13.2Z"
                fill="url(#1752500502787-3657460_folders_existing_0_vc2b9m2yx)"
                data-glass="clone"
                filter="url(#1752500502787-3657460_folders_filter_5b8vlbtha)"
                clip-path="url(#1752500502787-3657460_folders_clipPath_7vkg889mg)"
              ></path>
              <path
                d="M18.2 11C19.8802 11 20.7202 11 21.362 11.327C21.9265 11.6146 22.3854 12.0735 22.673 12.638C23 13.2798 23 14.1198 23 15.8V18.2C23 19.8802 23 20.7202 22.673 21.362C22.3854 21.9265 21.9265 22.3854 21.362 22.673C20.7202 23 19.8802 23 18.2 23H10.8C9.11984 23 8.27976 23 7.63803 22.673C7.07354 22.3854 6.6146 21.9265 6.32698 21.362C6 20.7202 6 19.8802 6 18.2L6 12.8C6 11.1198 6 10.2798 6.32698 9.63803C6.6146 9.07354 7.07354 8.6146 7.63803 8.32698C8.27976 8 9.11984 8 10.8 8L12.2874 8C12.9136 8 13.2266 8 13.5108 8.0863C13.7624 8.1627 13.9964 8.28796 14.1996 8.45491C14.429 8.64349 14.6027 8.90398 14.95 9.42496L16 11H18.2Z"
                fill="url(#1752500502787-3657460_folders_existing_1_nptnc7f8x)"
                data-glass="blur"
              ></path>
              <path
                d="M6 18.2002V12.7998C6 11.2247 6.00007 10.3879 6.26953 9.76074L6.32715 9.6377C6.57888 9.14381 6.96166 8.73057 7.43164 8.44238L7.6377 8.32715C8.27941 8.00018 9.11978 8 10.7998 8H12.2871C12.9131 8 13.2266 7.99968 13.5107 8.08594C13.7623 8.16233 13.9961 8.28818 14.1992 8.45508C14.4287 8.64366 14.6029 8.90383 14.9502 9.4248L16 11H18.2002C19.8802 11 20.7206 11.0002 21.3623 11.3271C21.9265 11.6147 22.3853 12.0735 22.6729 12.6377C22.9998 13.2794 23 14.1198 23 15.7998V18.2002L22.9951 19.3125C22.9798 20.2877 22.9181 20.881 22.6729 21.3623L22.5576 21.5684C22.2694 22.0383 21.8562 22.4211 21.3623 22.6729L21.2393 22.7305C20.7793 22.9281 20.2066 22.9811 19.3125 22.9951L18.2002 23V22.25C19.0525 22.25 19.6468 22.2497 20.1094 22.2119C20.5632 22.1748 20.824 22.1055 21.0215 22.0049C21.4448 21.7892 21.7892 21.4448 22.0049 21.0215C22.1055 20.824 22.1748 20.5632 22.2119 20.1094C22.2497 19.6468 22.25 19.0525 22.25 18.2002V15.7998C22.25 14.9475 22.2497 14.3532 22.2119 13.8906C22.1748 13.4368 22.1055 13.176 22.0049 12.9785C21.7892 12.5552 21.4448 12.2108 21.0215 11.9951C20.824 11.8945 20.5632 11.8252 20.1094 11.7881C19.6468 11.7503 19.0525 11.75 18.2002 11.75H15.5986L14.3262 9.84082C13.9531 9.28115 13.8467 9.13534 13.7236 9.03418C13.5967 8.92985 13.4502 8.85146 13.293 8.80371C13.1405 8.75741 12.96 8.75 12.2871 8.75H10.7998C9.94746 8.75 9.35322 8.75029 8.89062 8.78809C8.4368 8.82517 8.17602 8.89449 7.97852 8.99512C7.55515 9.21083 7.21083 9.55515 6.99512 9.97852C6.89449 10.176 6.82517 10.4368 6.78809 10.8906C6.75029 11.3532 6.75 11.9475 6.75 12.7998V18.2002C6.75 19.0525 6.75029 19.6468 6.78809 20.1094C6.82517 20.5632 6.89449 20.824 6.99512 21.0215C7.21083 21.4448 7.55515 21.7892 7.97852 22.0049C8.17602 22.1055 8.4368 22.1748 8.89062 22.2119C9.35322 22.2497 9.94745 22.25 10.7998 22.25V23C9.11978 23 8.27941 22.9998 7.6377 22.6729C7.14381 22.4211 6.73057 22.0383 6.44238 21.5684L6.32715 21.3623C6.0819 20.881 6.02021 20.2877 6.00488 19.3125L6 18.2002ZM18.2002 22.25V23H10.7998V22.25H18.2002Z"
                fill="url(#1752500502787-3657460_folders_existing_2_q0fpdkbg3)"
              ></path>
              <defs>
                <linearGradient
                  id="1752500502787-3657460_folders_existing_0_vc2b9m2yx"
                  x1="9.5"
                  y1="1"
                  x2="9.5"
                  y2="16"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#575757"></stop>
                  <stop offset="1" stop-color="#151515"></stop>
                </linearGradient>
                <linearGradient
                  id="1752500502787-3657460_folders_existing_1_nptnc7f8x"
                  x1="14.5"
                  y1="8"
                  x2="14.5"
                  y2="23"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#E3E3E5" stop-opacity=".6"></stop>
                  <stop
                    offset="1"
                    stop-color="#BBBBC0"
                    stop-opacity=".6"
                  ></stop>
                </linearGradient>
                <linearGradient
                  id="1752500502787-3657460_folders_existing_2_q0fpdkbg3"
                  x1="14.5"
                  y1="8"
                  x2="14.5"
                  y2="16.687"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#fff"></stop>
                  <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
                </linearGradient>
                <filter
                  id="1752500502787-3657460_folders_filter_5b8vlbtha"
                  x="-100%"
                  y="-100%"
                  width="400%"
                  height="400%"
                  filterUnits="objectBoundingBox"
                  primitiveUnits="userSpaceOnUse"
                >
                  <feGaussianBlur
                    stdDeviation="2"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    in="SourceGraphic"
                    edgeMode="none"
                    result="blur"
                  ></feGaussianBlur>
                </filter>
                <clipPath id="1752500502787-3657460_folders_clipPath_7vkg889mg">
                  <path
                    d="M18.2 11C19.8802 11 20.7202 11 21.362 11.327C21.9265 11.6146 22.3854 12.0735 22.673 12.638C23 13.2798 23 14.1198 23 15.8V18.2C23 19.8802 23 20.7202 22.673 21.362C22.3854 21.9265 21.9265 22.3854 21.362 22.673C20.7202 23 19.8802 23 18.2 23H10.8C9.11984 23 8.27976 23 7.63803 22.673C7.07354 22.3854 6.6146 21.9265 6.32698 21.362C6 20.7202 6 19.8802 6 18.2L6 12.8C6 11.1198 6 10.2798 6.32698 9.63803C6.6146 9.07354 7.07354 8.6146 7.63803 8.32698C8.27976 8 9.11984 8 10.8 8L12.2874 8C12.9136 8 13.2266 8 13.5108 8.0863C13.7624 8.1627 13.9964 8.28796 14.1996 8.45491C14.429 8.64349 14.6027 8.90398 14.95 9.42496L16 11H18.2Z"
                    fill="url(#1752500502787-3657460_folders_existing_1_nptnc7f8x)"
                  ></path>
                </clipPath>
                <mask id="1752500502787-3657460_folders_mask_u980pffha">
                  <rect width="100%" height="100%" fill="#FFF"></rect>
                  <path
                    d="M18.2 11C19.8802 11 20.7202 11 21.362 11.327C21.9265 11.6146 22.3854 12.0735 22.673 12.638C23 13.2798 23 14.1198 23 15.8V18.2C23 19.8802 23 20.7202 22.673 21.362C22.3854 21.9265 21.9265 22.3854 21.362 22.673C20.7202 23 19.8802 23 18.2 23H10.8C9.11984 23 8.27976 23 7.63803 22.673C7.07354 22.3854 6.6146 21.9265 6.32698 21.362C6 20.7202 6 19.8802 6 18.2L6 12.8C6 11.1198 6 10.2798 6.32698 9.63803C6.6146 9.07354 7.07354 8.6146 7.63803 8.32698C8.27976 8 9.11984 8 10.8 8L12.2874 8C12.9136 8 13.2266 8 13.5108 8.0863C13.7624 8.1627 13.9964 8.28796 14.1996 8.45491C14.429 8.64349 14.6027 8.90398 14.95 9.42496L16 11H18.2Z"
                    fill="#000"
                  ></path>
                </mask>
              </defs>
            </g>
          </svg>
        </div>
        <h3 className="text-2xl font-medium mb-1">Welcome to Bkmarky!</h3>
        <p className="text-lg text-muted-foreground">
          Create your first folder to start to organice your bookmarks!
        </p>
      </div>
    );
  }

  if (!bookmarks || bookmarks.length === 0) {
    return (
      <div className="text-center text-accent-foreground py-8">
        <div className="mb-5 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-16"
          >
            <title>file</title>
            <g fill="none">
              <path
                d="M13.3428 1C13.9996 1 14.4217 1.42173 15.1719 2.17188L19.8281 6.82812C20.5783 7.57827 21 8.00037 21 8.65723V19C21 21.2091 19.2091 23 17 23H7C4.79086 23 3 21.2091 3 19V5C3 2.79086 4.79086 1 7 1H13.3428ZM8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18H15.5C16.0523 18 16.5 17.5523 16.5 17C16.5 16.4477 16.0523 16 15.5 16H8ZM8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14H9C9.55228 14 10 13.5523 10 13C10 12.4477 9.55228 12 9 12H8ZM13 12C12.4477 12 12 12.4477 12 13C12 13.5523 12.4477 14 13 14H16C16.5523 14 17 13.5523 17 13C17 12.4477 16.5523 12 16 12H13Z"
                fill="url(#1752500502785-6792502_file_existing_0_ha8dpblo1)"
                data-glass="origin"
                mask="url(#1752500502785-6792502_file_mask_6pjiec06j)"
              ></path>
              <path
                d="M13.3428 1C13.9996 1 14.4217 1.42173 15.1719 2.17188L19.8281 6.82812C20.5783 7.57827 21 8.00037 21 8.65723V19C21 21.2091 19.2091 23 17 23H7C4.79086 23 3 21.2091 3 19V5C3 2.79086 4.79086 1 7 1H13.3428ZM8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18H15.5C16.0523 18 16.5 17.5523 16.5 17C16.5 16.4477 16.0523 16 15.5 16H8ZM8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14H9C9.55228 14 10 13.5523 10 13C10 12.4477 9.55228 12 9 12H8ZM13 12C12.4477 12 12 12.4477 12 13C12 13.5523 12.4477 14 13 14H16C16.5523 14 17 13.5523 17 13C17 12.4477 16.5523 12 16 12H13Z"
                fill="url(#1752500502785-6792502_file_existing_0_ha8dpblo1)"
                data-glass="clone"
                filter="url(#1752500502785-6792502_file_filter_pe3s0hi4h)"
                clip-path="url(#1752500502785-6792502_file_clipPath_t9np9je6l)"
              ></path>
              <path
                d="M13.3428 1C13.9996 1 14.4217 1.42173 15.1719 2.17188L19.8281 6.82812C20.5783 7.57827 21 8.00037 21 8.65723V9H15C13.8954 9 13 8.10457 13 7V1H13.3428Z"
                fill="url(#1752500502785-6792502_file_existing_1_dlzvjod37)"
                data-glass="blur"
              ></path>
              <path
                d="M13 7V1H13.3428C13.9996 1 14.4217 1.42173 15.1719 2.17188L19.8281 6.82812C20.5783 7.57827 21 8.00037 21 8.65723V9H15V8.25H20.1074C20.0992 8.2377 20.0921 8.22384 20.083 8.21094C19.9288 7.99318 19.6893 7.74982 19.2979 7.3584L14.6416 2.70215C14.2502 2.31073 14.0068 2.07117 13.7891 1.91699C13.776 1.90775 13.7624 1.89991 13.75 1.8916V7C13.75 7.69036 14.3096 8.25 15 8.25V9C13.8954 9 13 8.10457 13 7Z"
                fill="url(#1752500502785-6792502_file_existing_2_wmh1k53h9)"
              ></path>
              <defs>
                <linearGradient
                  id="1752500502785-6792502_file_existing_0_ha8dpblo1"
                  x1="12"
                  y1="1"
                  x2="12"
                  y2="23"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#575757"></stop>
                  <stop offset="1" stop-color="#151515"></stop>
                </linearGradient>
                <linearGradient
                  id="1752500502785-6792502_file_existing_1_dlzvjod37"
                  x1="17"
                  y1="1"
                  x2="17"
                  y2="9"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#E3E3E5" stop-opacity=".6"></stop>
                  <stop
                    offset="1"
                    stop-color="#BBBBC0"
                    stop-opacity=".6"
                  ></stop>
                </linearGradient>
                <linearGradient
                  id="1752500502785-6792502_file_existing_2_wmh1k53h9"
                  x1="17"
                  y1="1"
                  x2="17"
                  y2="5.633"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#fff"></stop>
                  <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
                </linearGradient>
                <filter
                  id="1752500502785-6792502_file_filter_pe3s0hi4h"
                  x="-100%"
                  y="-100%"
                  width="400%"
                  height="400%"
                  filterUnits="objectBoundingBox"
                  primitiveUnits="userSpaceOnUse"
                >
                  <feGaussianBlur
                    stdDeviation="2"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    in="SourceGraphic"
                    edgeMode="none"
                    result="blur"
                  ></feGaussianBlur>
                </filter>
                <clipPath id="1752500502785-6792502_file_clipPath_t9np9je6l">
                  <path
                    d="M13.3428 1C13.9996 1 14.4217 1.42173 15.1719 2.17188L19.8281 6.82812C20.5783 7.57827 21 8.00037 21 8.65723V9H15C13.8954 9 13 8.10457 13 7V1H13.3428Z"
                    fill="url(#1752500502785-6792502_file_existing_1_dlzvjod37)"
                  ></path>
                </clipPath>
                <mask id="1752500502785-6792502_file_mask_6pjiec06j">
                  <rect width="100%" height="100%" fill="#FFF"></rect>
                  <path
                    d="M13.3428 1C13.9996 1 14.4217 1.42173 15.1719 2.17188L19.8281 6.82812C20.5783 7.57827 21 8.00037 21 8.65723V9H15C13.8954 9 13 8.10457 13 7V1H13.3428Z"
                    fill="#000"
                  ></path>
                </mask>
              </defs>
            </g>
          </svg>
        </div>
        <h3 className="text-2xl font-medium mb-1">Empty folder</h3>
        <p className="text-lg text-muted-foreground">
          "{activeFolder.name}" is empty. Add your first bookmark.
        </p>
      </div>
    );
  }

  return (
    <ul>
      <AnimatePresence mode="popLayout">
        {bookmarks?.map((bookmark, index) => (
          <MotionEffect
            key={bookmark._id}
            fade
            blur
            slide={{ direction: "up", offset: 25 }}
            delay={0.01 + index * 0.1}
          >
            <BookmarkItem bookmark={bookmark} />
          </MotionEffect>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default BookmarksList;
