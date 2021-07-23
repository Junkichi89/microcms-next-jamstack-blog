import React from "react";
import style from "./index.module.scss";
import { Grid, TextField, Button } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { NextPage } from "next";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import Coffee from "models/Coffee";
import { useRouter } from "next/router";

const CoffeeIndex: NextPage = () => {
  const router = useRouter();

  //??について、null合体演算子(https://developer.mozilla.org/ja/docs/orphaned/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
  //左辺の値がnullまたはundefinedの場合、右辺を返し、それ以外の場合に左辺を返す
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("コーヒー豆の名前は必須項目です"),
    place: Yup.string().required("購入場所は必須項目です"),
    origin: Yup.string().required("生産国は必須項目です"),
    evaluation: Yup.string().required("評価は必須項目です"),
    memo: Yup.string().required("メモは必須です。"),
  });

  const onSubmit = async (coffee: Coffee): Promise<void> => {
    try {
      await fetch(baseUrl + "/api/coffee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(coffee),
      }).then((res) => {
        if (!res.ok) {
          throw Error(`${res.status} ${res.statusText}`);
        }
      });

      void router.push("/coffee/success");
    } catch (err) {
      void router.push("/coffee/error");
    }
  };

  //TODO：(調査)ここの処理が不明
  const { control, handleSubmit, errors } = useForm<Coffee>({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={style.form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            required
            fullWidth
            id="title"
            label="コーヒー豆の名前"
            name="title"
            autoComplete="title"
            defaultValue=""
            //ここの?の意味は？
            error={!!errors.title?.message}
          />
          {errors.title && <p className={style.error}>{errors.title.message}</p>}
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            required
            fullWidth
            id="place"
            label="購入場所"
            name="place"
            autoComplete="place"
            defaultValue=""
            error={!!errors.place?.message}
          />
          {errors.place && (
            <p className={style.error}>{errors.place.message}</p>
          )}
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            required
            fullWidth
            id="origin"
            label="生産国"
            name="origin"
            autoComplete="origin"
            defaultValue=""
            error={!!errors.origin?.message}
          />
          {errors.origin && (
            <p className={style.error}>{errors.origin.message}</p>
          )}
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            required
            fullWidth
            id="evaluation"
            label="評価"
            name="evaluation"
            autoComplete="evaluation"
            defaultValue=""
            error={!!errors.evaluation?.message}
          />
          {errors.evaluation && (
            <p className={style.error}>{errors.evaluation.message}</p>
          )}
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            required
            fullWidth
            multiline
            rows={6}
            name="memo"
            label="メモ"
            id="memo"
            autoComplete="memo"
            defaultValue=""
            error={!!errors.memo?.message}
          />
          {errors.memo && <p className={style.error}>{errors.memo.message}</p>}
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        className={style.send}
        aria-label="送信"
      >
        送信
      </Button>
    </form>
  );
};

export default CoffeeIndex;
